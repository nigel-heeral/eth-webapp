import React, { Component } from 'react';
import './App.css';
import Form from './Form';
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8545');

class App extends Component {
  //Set 3 state values: accounts, balance, and network
  state = {
    accounts: [],
    balance: 0,
    network: '',
    inputValue: '',
  }

  componentDidMount(){
    this.getAddress();
  }

  setInputValue = (value) => {
    this.setState({inputValue: value});
  }
  
  //sets accounts state
  getAddress = async () =>{
    //accounts is an array containing account addresses belonging to user
    var accounts = await web3.eth.getAccounts();
    //set accounts state and call getBalance()
    this.setState({accounts: accounts});
    this.getBalance();
  }

  //sets balance state
  getBalance = async () => {
    //var balance = the integer value of wei balance of the first address in array accounts
    var balance = await web3.eth.getBalance(this.state.accounts[0]);
    //wei converted to ether
    balance = web3.utils.fromWei(balance.toString(), "ether");
    //set state and call getNetwork()
    this.setState({balance: balance})
    this.getNetwork()
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
    this.setState({network: network})
  }
    
  //TODO: add if statement for user not connected to metamask
  //TODO: find better way to render info than <li>
  //render states
  render() {
    return(
      <div>
        <li>Account address: {this.state.accounts[0]}</li>
        <li>Account balance: {this.state.balance}</li>
        <li>Current Network: {this.state.network}</li>
	<br />
	<Form setInputValue={this.setInputValue} />
	<li>You wrote: {this.state.inputValue}</li>
      </div>
    );
  }
}
export default App;
