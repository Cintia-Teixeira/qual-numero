import React, { useState } from "react";
import './Modal.css'

/**
 * O usuário pode definir um novo intervalo para o jogo ou simplesmente fechar a modal e manter o intervalo padrão, de 1 a 300. 
 */

function Modal(props) {
    const [errorDisplay, setErrorDisplay] = useState('none');

    function handleChange(event) {
        event.preventDefault();

        let target = event.target.value;

        // exibe uma mensagem de erro caso o palpite colocado no input seja negativo ou com mais de 3 algarismos
        if (target < 0 || target.length > 3) {
            setErrorDisplay('block');
            return false
        }

        setErrorDisplay('none');

        if (event.target.id === "lowerLimit") {
            props.handleMinChange(target);
        }

        if (event.target.id === 'upperLimit') {
            props.handleMaxChange(target);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        let minTarget = event.target[0].value;
        let maxTarget = event.target[1].value;

        setErrorDisplay('none');

        props.handleModalSubmit(minTarget, maxTarget);
    }

    return (
        <div className="modal-container" style={{ display: props.display }}>
            <div className="modal" aria-expanded="true">
                <div className="btn-close" onClick={props.close}>
                    <span className="close-pipe close-pipe1">|</span>
                    <span className="close-pipe close-pipe2">|</span>
                </div>
                <p className="instruction">Escolha um intervalo para o valor a ser gerado:</p>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="limits-container">
                        <div className="input-container">
                            <input className="input input-modal" id="lowerLimit" type="number" value={props.min} placeholder="Limite inferior" onChange={handleChange}></input>
                            <input className="input input-modal" id="upperLimit" type="number" value={props.max} placeholder="Limite superior" onChange={handleChange}></input>
                        </div>
                        <span className="error" style={{ display: errorDisplay }}>* Atenção, são permitidos apenas números não-negativos de 1 a 3 algarismos.</span>
                    </div>
                    <button className="btn btn-modal" type="submit">Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default Modal;
