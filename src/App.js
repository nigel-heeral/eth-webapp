import React, { Component } from 'react';
import './App.css';
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8545');

class App extends Component {
  //Set 3 state values: accounts, balance, and network
  state = {
    accounts: [],
    balance: 0,
    network: ''        
  }

  componentDidMount(){
    this.getAddress();
  }
  
  //sets accounts state
  getAddress = () => {
    //accounts is an array containing account addresses belonging to user
    var accounts = web3.eth.getAccounts(function(err, accounts){ 
      return accounts
    })
    //set accounts state and call getBalance()
    accounts.then(accounts => {
      this.setState({accounts: accounts})
      this.getBalance();
    })
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
    if(network === 'main'){
      network = 'Main Ethereum Network'
    }
    if(network === 'ropsten'){
      network = 'Ropsten Test Network'
    }
    if(network === 'kovan'){
      network = 'Kovan Test Network'
    }
    if(network === 'rinkeby'){
      network = 'Rinkeby Test Network'
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
      </div>
    );
  }
}
export default App;