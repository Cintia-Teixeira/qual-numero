import React, { useEffect, useState } from 'react';
import './App.css';
import Led from './components/Led/Led';
import Modal from './components/Modal/Modal';

function App() {
  const [value, setValue] = useState('');
  const [guess, setGuess] = useState('');
  const [ledContent, setLedContent] = useState('0');
  const [feedback, setFeedback] = useState('');
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(300);
  const [showBtn, setShowBtn] = useState(0);
  const [modalDisplay, setModalDisplay] = useState('none');
  const [disabled, setDisabled] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState('none');

  useEffect(() => {
    getValue(min, max);
    // eslint-disable-next-line
  }, []);

  async function getValue(min, max) {

    try {
      await fetch(`https://us-central1-ss-devops.cloudfunctions.net/rand?min=${min}&max=${max}`)
        .then(response => response.json())
        .then(response => {
          setValue(response.value);

          if (response.Error) {
            setFeedback('ERRO');
            setLedContent(response.StatusCode.toString());
            setShowBtn(1);
            setModalDisplay('none');
            setDisabled(true);
          }
        })
    } catch (error) {
      setFeedback('ERRO');
      setLedContent('500');
      setShowBtn(1);
      setModalDisplay('none');
    }
  }

  function handleInputChange(event) {
    let target = event.target.value;

    // exibe uma mensagem de erro caso o palpite colocado no input seja negativo ou com mais de 3 algarismos
    if (target < 0 || target.length > 3) {
      setErrorDisplay('block');
      return false
    }

    setErrorDisplay('none');

    // retira o primeiro algarismo do número a ser exibido no LED caso o palpite inserido pelo usuário tiver mais de um algarismo e o primeiro for 0 
    if (target.length > 1 && target[0] === '0') {
      target = target.slice(1);
    }

    setGuess(target);
  }

  function handleGuessSubmit(event) {
    event.preventDefault();

    setGuess(event.target.value);
    setErrorDisplay('none');
    setLedContent(guess);

    // compara o palpite com o valor aleatório e define o feedback a ser dado ao usuário
    let result = guess > value ? 'É menor' :
      guess < value ? 'É maior' :
        'Você acertou!!!!'

    if (result === 'Você acertou!!!!') {
      setShowBtn(1);
      setDisabled(true);
    }

    setGuess('');
    setFeedback(result);
  }

  function newGame() {
    setModalDisplay('flex');
    cleanContent();
  }

  function cleanContent() {
    setFeedback('');
    setLedContent('0');
    setShowBtn(0);
    setMin('');
    setMax('');
    setDisabled(false);
  }

  function handleMinChange(target) {
    setMin(target);
  }

  function handleMaxChange(target) {
    setMax(target);
  }

  function handleModalSubmit(minTarget, maxTarget) {

    setMin(minTarget);
    setMax(maxTarget);
    setModalDisplay('none');

    getValue(min, max);
  }

  // se a modal for fechada, a nova partida terá o intervalo padrão, de 1 a 300
  function closeModal() {
    setModalDisplay('none');
    getValue(1, 300);
  }

  return (
    <div className="App">
      <h1 className="title">Qual é o número?</h1>
      <span className="line"></span>
      <div className="led-container">
        <span className="feedback" style={{ color: feedback.match(/Erro/gi) ? '#CC3300' : feedback.match(/acertou/gi) && '#32BF00' }}>{feedback}</span>
        <Led numbers={ledContent} color={feedback.match(/Erro/gi) ? '#CC3300' : feedback.match(/acertou/gi) && '#32BF00'} />
        <button className="btn btn-new-game" onClick={newGame} style={{ opacity: showBtn }}>
          <img src="refresh-icon.svg" alt="Nova Partida" />
          Nova Partida
        </button>
      </div>
      <form className="guess-form" onSubmit={handleGuessSubmit}>
        <input className="input" type="number" disabled={disabled} required value={guess} onChange={handleInputChange} placeholder="Digite o palpite" />
        <button className="btn btn-guess" type="submit" disabled={disabled}>Enviar</button>
        <span className="error" style={{ display: errorDisplay }}>* Atenção, são permitidos apenas números não-negativos de 1 a 3 algarismos.</span>
      </form>
      <Modal handleModalSubmit={handleModalSubmit} handleMinChange={handleMinChange} handleMaxChange={handleMaxChange} min={min} max={max} display={modalDisplay} errorDisplay={errorDisplay} close={closeModal} />
    </div>
  );

}

export default App;
