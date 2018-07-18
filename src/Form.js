import React, { Component } from 'react';
import styled from 'styled-components';

class Form extends Component {
    // Set initial state value
    constructor(props) {
	super(props);
	this.state = {value: ''};
    }

    // Take in user string input and send to parent value
    handleSubmit = (e) => {
	this.props.handleInputSubmit();
	e.preventDefault();
    }

    render() {
	return (
	  <div>
	    <form onSubmit={this.handleSubmit}>
	      <br />
	      <label> 
	        Enter anything! 
	        <br />
		<input type="text" name="data" ref="input" value={this.props.inputValue} onChange={this.props.handleInputChange}/>
		<input type="submit" value="Submit" />
	      </label>
	    </form>
	  </div>
	)
    }
}

export default Form;
