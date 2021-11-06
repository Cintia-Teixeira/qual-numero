import React from 'react';
import './App.css';
import Modal from './components/Modal/Modal';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      guess: '',
      ledContent: 0,
      feedback: '',
      min: 1,
      max: 300,
      btnDisplay: 'none',
      modalDisplay: 'none',
      disabled: false,
      errorDisplay: 'none'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValue = this.getValue.bind(this);
    this.cleanContent = this.cleanContent.bind(this);
    this.newGame = this.newGame.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleMinChange = this.handleMinChange.bind(this);
    this.handleMaxChange = this.handleMaxChange.bind(this);
  }

  handleChange(event) {
    let target = event.target.value;

    if(target < 0 || target.length > 3) {
      this.setState({errorDisplay: 'block'})
      return false
    }

    this.setState({errorDisplay: 'none'})

    if(target.length > 1 && target[0] === '0') {
      target = target.slice(1)
    }

    this.setState({guess: target});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target[0].value);

    this.setState({guess: event.target.value,
      errorDisplay: 'none'});

    this.setState({ledContent: this.state.guess, guess: ''});

    let result = this.state.guess > this.state.value ? 'É menor' : 
                this.state.guess < this.state.value ? 'É maior' :
                'Você acertou!!!!'
    if(result === 'Você acertou!!!!' ) this.setState({btnDisplay: 'inline-block', disabled: true})

    this.setState({feedback: result});
  }

  handleMinChange(event) {
    this.setState({min: event.target.value});
  }

  handleMaxChange(event) {
      this.setState({max: event.target.value});
  }

  handleModalSubmit(event) {
    event.preventDefault();

    this.setState({
      min: event.target[0].value,
      max: event.target[1].value,
      modalDisplay: 'none'
    });

    this.getValue(this.state.min, this.state.max);
  }

  componentDidMount() {
    this.getValue();
  }

  async getValue() { 
    const minValue = this.state.min;
    const maxValue = this.state.max;

    try {
      await fetch(`https://us-central1-ss-devops.cloudfunctions.net/rand?min=${minValue}&max=${maxValue}`)
        .then(response => response.json())
        .then(response => {
            this.setState({value: response.value});
            console.log(this.state.value);

            if(response.Error) {
              this.setState({ledContent: response.StatusCode, feedback: 'ERRO', btnDisplay: 'inline-block', modalDisplay: 'none', disabled: true});
            }
        })
    } catch(error) {
      this.setState({ledContent: 500, feedback: 'ERRO', btnDisplay: 'inline-block', modalDisplay: 'none'});
    }   
  }

  newGame() {
    this.setState({modalDisplay: 'flex'});
    this.cleanContent();
  }

  cleanContent() {
    this.setState({
      feedback: '',
      ledContent: 0,
      btnDisplay: 'none',
      min: '',
      max: '',
      disabled: false
    });
  }


  render() {
    return (
      <div className="App">
        <h1 className="title">Qual é o número?</h1>
        <span className="line"></span>
        <div className="led-container">
          <span className="feedback" style={{color: this.state.feedback.match(/Erro/gi) ? '#CC3300' : this.state.feedback.match(/acertou/gi) && '#32BF00'}}>{this.state.feedback}</span>
          <span style={{color: this.state.feedback.match(/Erro/gi) ? '#CC3300' : this.state.feedback.match(/acertou/gi) && '#32BF00'}}>{this.state.ledContent}</span>
          <button className="btn-new-game" onClick={this.newGame} style={{display: this.state.btnDisplay}}>Nova Partida</button>
        </div>
        <form className="guess-form" onSubmit={this.handleSubmit}>
          <input className="input" type="number" disabled={this.state.disabled} required value={this.state.guess} onChange={this.handleChange} placeholder="Digite o palpite"/>
          <button className="btn btn-guess" type="submit" disabled={this.state.disabled}>Enviar</button>
          <span className="error" style={{display: this.state.errorDisplay}}>* Atenção, são permitidos apenas números não-negativos de 1 a 3 algarismos.</span>
        </form>
        <Modal handleModalSubmit={this.handleModalSubmit} handleMinChange={this.handleMinChange} handleMaxChange={this.handleMaxChange} min={this.state.min} max={this.state.max} display={this.state.modalDisplay}/>
      </div>
    );
  }
}

export default App;
