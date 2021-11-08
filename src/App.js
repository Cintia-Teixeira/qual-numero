import React from 'react';
import './App.css';
import Led from './components/Led/Led'; 
import Modal from './components/Modal/Modal';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      guess: '',
      ledContent: '0',
      feedback: '',
      min: 1,
      max: 300,
      showBtn: 0,
      modalDisplay: 'none',
      disabled: false,
      errorDisplay: 'none'
    }

    this.getValue = this.getValue.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGuessSubmit = this.handleGuessSubmit.bind(this);
    this.newGame = this.newGame.bind(this);
    this.cleanContent = this.cleanContent.bind(this);
    this.handleMinChange = this.handleMinChange.bind(this);
    this.handleMaxChange = this.handleMaxChange.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.getValue(this.state.min, this.state.max);
  }

  async getValue(min, max) {

    try {
      await fetch(`https://us-central1-ss-devops.cloudfunctions.net/rand?min=${min}&max=${max}`)
        .then(response => response.json())
        .then(response => {
          this.setState({ value: response.value });
          console.log(this.state.value);

          if (response.Error) {
            this.setState({ ledContent: response.StatusCode.toString(), feedback: 'ERRO', showBtn: 1, modalDisplay: 'none', disabled: true });
          }
        })
    } catch (error) {
      this.setState({ ledContent: '500', feedback: 'ERRO', showBtn: 1, modalDisplay: 'none' });
    }
  }

  handleInputChange(event) {
    let target = event.target.value;

    if (target < 0 || target.length > 3) {
      this.setState({ errorDisplay: 'block' });
      return false
    }

    this.setState({ errorDisplay: 'none' });

    if (target.length > 1 && target[0] === '0') {
      target = target.slice(1);
    }

    this.setState({ guess: target });
  }

  handleGuessSubmit(event) {
    event.preventDefault();

    this.setState({ guess: event.target.value, errorDisplay: 'none', ledContent: this.state.guess });

    let result = this.state.guess > this.state.value ? 'É menor' :
      this.state.guess < this.state.value ? 'É maior' :
        'Você acertou!!!!'

    if (result === 'Você acertou!!!!') {
      this.setState({ showBtn: 1, disabled: true });
    }

    this.setState({ guess: '', feedback: result });
  }

  newGame() {
    this.setState({ modalDisplay: 'flex' });
    this.cleanContent();
  }

  cleanContent() {
    this.setState({
      feedback: '',
      ledContent: '0',
      showBtn: 0,
      min: '',
      max: '',
      disabled: false
    });
  }

  handleMinChange(target) {
    this.setState({ min: target });
  }

  handleMaxChange(target) {
    this.setState({ max: target });
  }

  handleModalSubmit(minTarget, maxTarget) {

    this.setState({ min: minTarget, max: maxTarget, modalDisplay: 'none' });

    this.getValue(this.state.min, this.state.max);
  }

  closeModal() {
    this.setState({ modalDisplay: 'none' });
    this.getValue(1, 300);
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Qual é o número?</h1>
        <span className="line"></span>
        <div className="led-container">
          <span className="feedback" style={{ color: this.state.feedback.match(/Erro/gi) ? '#CC3300' : this.state.feedback.match(/acertou/gi) && '#32BF00' }}>{this.state.feedback}</span>
          <Led numbers={this.state.ledContent} color={this.state.feedback.match(/Erro/gi) ? '#CC3300' : this.state.feedback.match(/acertou/gi) && '#32BF00'}/>
          <button className="btn btn-new-game" onClick={this.newGame} style={{ opacity: this.state.showBtn }}>
            <img src="refresh-icon.svg" alt="Nova Partida" />
            Nova Partida
          </button>
        </div>
        <form className="guess-form" onSubmit={this.handleGuessSubmit}>
          <input className="input" type="number" disabled={this.state.disabled} required value={this.state.guess} onChange={this.handleInputChange} placeholder="Digite o palpite" />
          <button className="btn btn-guess" type="submit" disabled={this.state.disabled}>Enviar</button>
          <span className="error" style={{ display: this.state.errorDisplay }}>* Atenção, são permitidos apenas números não-negativos de 1 a 3 algarismos.</span>
        </form>
        <Modal handleModalSubmit={this.handleModalSubmit} handleMinChange={this.handleMinChange} handleMaxChange={this.handleMaxChange} min={this.state.min} max={this.state.max} display={this.state.modalDisplay} errorDisplay={this.state.errorDisplay} close={this.closeModal} />
      </div>
    );
  }
}

export default App;
