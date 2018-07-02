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
	this.props.setInputs(this.state.value);
	e.preventDefault();
    }

    // Consistently update state of input value
    handleChange = (e) => {
	this.setState({value: e.target.value});
    }

    render() {
	return (
	  <div>
	    <form onSubmit={this.handleSubmit}>
	      <br />
	      <label> 
	        Enter anything! 
	        <br />
		<input type="text" name="data" value={this.state.value} onChange={this.handleChange}/>
		<input type="submit" value="Submit" />
	      </label>
	    </form>
	  </div>
	)
    }
}

export default Form;
