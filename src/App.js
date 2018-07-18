import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Form from './Form';
import DisplayInput from './DisplayInput.js';
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
`;

const Title = styled.div`
  font-size: 2.5em;
  text-align: center;
  color: palevioletred;
`;

const Text = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: cornflowerblue;
`;

class App extends Component {
  //Set 3 state values: accounts, balance, and network
  state = {
    accounts: [],
    balance: 0,
    network: '',
    input: '',
    inputs: []
  }

  async componentDidMount (){
    const account= await this.getAddress();
    console.log(account);
    if (!account) return; 
    this.getBalance(account);
    this.getNetwork();
  }

  handleInputChange = async (e) => {
    this.setState({input: e.target.value})
  }

  handleInputSubmit = async () => {
    const input = this.state.input;
    this.setState((prevState) => ({
	inputs: prevState.inputs.concat(input)
    }));
    var hexAddr = input.substr(0,2);
    if(hexAddr === '0x'){
      await this.setState({accounts: [input]});
      this.getBalance(this.state.accounts[0]);
      this.getNetwork();
    }
    else{
      this.setState({accounts: [], balance: null, network: ''});
    }
  }
  
  //sets accounts state
  getAddress = async () =>{
    //accounts is an array containing account addresses belonging to user
    var accounts = await web3.eth.getAccounts();
    // If user is not connected to MetaMask, exit
    if(accounts[0] == null){
	alert('you need to sign into MetaMask');
	return false;
    }
    //set accounts state and call getBalance()
    this.setState({accounts});
    return accounts[0];
  }

  //sets balance state
  getBalance = async (accountAddress) => {
    //var balance = the integer value of wei balance of the first address in array accounts
    const rawBalance = await web3.eth.getBalance(accountAddress);
    //wei converted to ether
    const balance = web3.utils.fromWei(rawBalance.toString(), "ether");
    //set state and call getNetwork()
    this.setState({balance})
  }

  //sets network state
  getNetwork = async () => {
    //string network is set to ethereum network user is currently running
    var network = await web3.eth.net.getNetworkType();
    //clean up what is returned
    switch(network){
      case 'main': 
        network = 'Main Ethereum Network';
        break;
      case 'ropsten': 
        network = 'Ropsten Test Network';
        break;
      case 'kovan': 
        network = 'Kovan Test Network';
        break;
      case 'rinkeby': 
        network = 'Rinkeby Test Network';
        break;
      default:
        network = 'Unknown Network';
    }
    //set state
    this.setState({network})
  }
  
  //render states
  render() {
    return(
      <Wrapper>
        <Title>Account address </Title>
 	<Text> {this.state.accounts[0]} </Text> 
	<br />
        <Title>Account balance </Title>
 	<Text> {this.state.balance} </Text>
	<br />
        <Title>Current Network </Title>
	<Text> {this.state.network} </Text>
	<br />
	<Title>
	  <Form inputValue={this.state.input} handleInputChange={this.handleInputChange} handleInputSubmit={this.handleInputSubmit} />
	</Title>
	<Title>You wrote </Title>
	<Text>
	<DisplayInput inputs={this.state.inputs}></DisplayInput>
	</Text>
      </Wrapper>
    );
  }
}
export default App;
