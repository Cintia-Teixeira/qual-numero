import React from "react";
import './Modal.css'

/**
 * O usuário pode definir um novo intervalo para o jogo ou simplesmente fechar a modal e manter o intervalo padrão, de 1 a 300. 
 */

class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            errorDisplay: 'none'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        let target = event.target.value;
        
        // exibe uma mensagem de erro caso o palpite colocado no input seja negativo ou com mais de 3 algarismos
        if(target < 0 || target.length > 3) {
            this.setState({errorDisplay: 'block'})
            return false
        }
      
        this.setState({errorDisplay: 'none'});

        if(event.target.id === "lowerLimit") {
            this.props.handleMinChange(target)
        }

        if(event.target.id === 'upperLimit') {
            this.props.handleMaxChange(target)
        } 
    }

    handleSubmit(event) {
        event.preventDefault();

        let minTarget = event.target[0].value;
        let maxTarget = event.target[1].value;

        this.setState({errorDisplay: 'none'});

        this.props.handleModalSubmit(minTarget, maxTarget);
    }

    render() {
        return (
            <div className="modal-container" style={{display: this.props.display}}>
                <div className="modal" aria-expanded="true">
                    <div className="btn-close" onClick={this.props.close}>
                        <span className="close-pipe close-pipe1">|</span>
                        <span className="close-pipe close-pipe2">|</span>
                    </div>
                    <p className="instruction">Escolha um intervalo para o valor a ser gerado:</p>
                    <form className="modal-form" onSubmit={this.handleSubmit}>
                        <div className="limits-container">
                            <div className="input-container">
                                <input className="input input-modal" id="lowerLimit" type="number" value={this.props.min} placeholder="Limite inferior" onChange={this.handleChange}></input>
                                <input className="input input-modal" id="upperLimit" type="number" value={this.props.max} placeholder="Limite superior" onChange={this.handleChange}></input>
                            </div>
                            <span className="error" style={{display: this.state.errorDisplay}}>* Atenção, são permitidos apenas números não-negativos de 1 a 3 algarismos.</span>
                        </div>
                        <button className="btn btn-modal" type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Modal;
