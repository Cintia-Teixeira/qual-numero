import React from "react";
import Number from '../Number/Number';

function Led(props) {
    let content = []

    if (props.numbers) {

        const arr = props.numbers.split('');

        arr.map((number, index) => content.push(<Number number={number} key={`${number}_${index}`} color={props.color} />));
    }

    return (
        <div>{content}</div>
    )

}

export default Led;