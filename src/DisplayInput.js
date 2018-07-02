import React, { Component } from 'react';

class DisplayInput extends Component {
    constructor(props) {
	super(props);
	this.nonce = 0;
    }
    render() {
	let list = this.props.inputs.map(input => {
	    return <li key={this.nonce++}>{ input }</li>
	});
	return (
	    <div>
		{list}
	    </div>
	)
    }
}

export default DisplayInput;
