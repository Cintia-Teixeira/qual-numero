import React from 'react';
import './App.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      guess: '',
      ledContent: '',
      feedback: '',
      btnDisplay: 'none'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValue = this.getValue.bind(this);
    this.cleanContent = this.cleanContent.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  handleChange(event) {
    this.setState({guess: event.target.value});
  }

  handleSubmit(event) {
    this.setState({ledContent: this.state.guess, guess: ''});
    event.preventDefault();

    let result = this.state.guess > this.state.value ? 'É menor' : 
                this.state.guess < this.state.value ? 'É maior' :
                'Você acertou!!!!'
    if(result === 'Você acertou!!!!' ) this.setState({btnDisplay: 'inline-block'})

    this.setState({feedback: result});
  }

  componentDidMount() {
    this.getValue();
  }

  getValue() {  
    fetch('https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300')
    .then(response => response.json())
        .then(response => {
            this.setState({value: response.value});
            console.log(this.state.value);

            if(response.Error) {
              this.setState({ledContent: response.StatusCode, feedback: 'ERRO', btnDisplay: 'inline-block'});
            }
        })
        // .catch(erro => console.log('Algo errado: ' + erro));  
  }

  newGame() {
    this.getValue();
    this.cleanContent();
  }

  cleanContent() {
    this.setState({
      feedback: '',
      ledContent: '',
      btnDisplay: 'none'
    })
  }


  render() {
    return (
      <div className="App">
        <h1 className="title">Qual é o número?</h1>
        <span className="line"></span>
        <div className="led-container">
          <span className="feedback" style={{color: this.state.feedback.match(/Erro/gi) ? '#CC3300' : this.state.feedback.match(/acertou/gi) && '#32BF00'}}>{this.state.feedback}</span>
          <span style={{color: this.state.feedback.match(/Erro/gi) ? '#CC3300' : this.state.feedback.match(/acertou/gi) && '#32BF00'}}>{this.state.ledContent}</span>
          <button className="btn-new-game" style={{display: this.state.btnDisplay}} onClick={this.newGame}>Nova Partida</button>
        </div>
        <form className="guess-form" onSubmit={this.handleSubmit}>
          <input className="guess" type="number" value={this.state.guess} onChange={this.handleChange} placeholder="Digite o palpite"/>
          <button className="btn" type="submit">Enviar</button>
        </form>
      </div>
    );
  }
}

export default App;
