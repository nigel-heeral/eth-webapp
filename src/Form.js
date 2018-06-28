import React, { Component } from 'react';

class Form extends Component {
    // Set initial state value
    constructor(props) {
	super(props);
	this.state = {value: ''};
    }

    // Take in user string input and send to parent value
    handleSubmit = (e) => {
	this.props.setInputValue(this.state.value);
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
	      <label> 
	        Enter anything! 
		<input type="text" name="data" value={this.state.value} onChange={this.handleChange}/>
		<input type="submit" value="Submit" />
	      </label>
	    </form>
	  </div>
	)
    }
}

export default Form;
