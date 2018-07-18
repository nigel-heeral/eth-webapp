import React, { Component } from 'react';

/* class DisplayInput extends Component {
    render() {
	let list = this.props.inputs.map((input, index) => {
	    return <li key={input + index}>{ input }</li>
	});
	return (
	    <div>
		{list}
	    </div>
	)
    }
} */

function DisplayInput(props) {
	let list = props.inputs.map((input, index) => {
	    return <li key={input + index}>{ input }</li>
	});
	return (
	    <div>{props.children}
		{list}
	    </div>
	)

}

export default DisplayInput;
