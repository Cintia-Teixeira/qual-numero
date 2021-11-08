import React from "react";
import Number from '../Number/Number';

function Led(props) {
    let content = []

    if (props.numbers) {

        const arr = props.numbers.split('');

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