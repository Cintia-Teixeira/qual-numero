import React from "react";
import Number from '../Number/Number';

function Led(props) {
    let content = [];

    if (props.numbers) {

        // cria um array com os algarismos que formam o número a ser exibido no display
        const arr = props.numbers.split('');

        // rendezira um componente Number para cada algarismo do array
        content = (
            <div>
                {arr.map((number, index) => (<Number number={number} color={props.color} key={`${props.numbers}#${index}`} />))}
            </div>
        );
    }

    return (
        <>
            {content}
        </>
    )
}

export default Led;