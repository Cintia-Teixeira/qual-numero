import React from "react";
import './Modal.css'

class Modal extends React.Component {

    render() {
        return (
            <div className="modal-container" style={{display: this.props.display}}>
                <div className="modal" aria-expanded="true">
                    <p>Escolha um intervalo para o valor a ser gerado:</p>
                    <form onSubmit={this.props.handleModalSubmit}>
                        <div className="input-container">
                            <input className="input input-modal" type="number" value={this.props.min} placeholder="Limite inferior" onChange={this.props.handleMinChange}></input>
                            <input className="input input-modal" type="number" value={this.props.max} placeholder="Limite superior" onChange={this.props.handleMaxChange}></input>
                        </div>
                        <button className="btn btn-modal" type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Modal;
