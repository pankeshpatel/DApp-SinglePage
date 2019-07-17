import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';

// This would import the deployed contract and
// its ABI.
import lottery from './lottery';

// Step 1: Component Render
class App extends Component {

  // This is a state initialization
  state = {
      manager: '',
      players: [],
      balance: '',
      value: '',
      message: ''
  };


// Step 2: componentDidMount() method call
// This is a function call to fetch information
// about our contracts.
  async componentDidMount(){
    // We do not need to provide "From" argument
    // Whenever we use the metamask Web3 library
    // the default account will be take place.
    // Step 3: Call methods on Contracts
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    // Step 4: set data on 'state'
    this.setState({manager, players, balance});
  }
  onSubmit = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      this.setState({message: 'Waiting on transaction success...'});
      await lottery.methods.enter().send({
        from : accounts[0],
        value : web3.utils.toWei(this.state.value, 'ether')
      });

      this.setState({message: 'you have been entered into the lottery!!!'});

    };

      onClick = async () => {
          const accounts = await web3.eth.getAccounts();
          this.setState({message: 'Waiting on transaction success...'});
          await lottery.methods.pickWinner().send({
              from: accounts[0]
          });
          this.setState({message: 'A Winner has been picked ....'});
      };


    render() {
      return (
        <div>
          <h2> Lottery Contract</h2>
          <p>
          This contract is managed by {this.state.manager}.
          </p>
          <p>
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
          </p>
          <hr/>

          <form onSubmit={this.onSubmit}>
            <h4> Want to try your luck?</h4>
            <div>
                <label> Amount of ether to enter</label>
                <input
                    value = {this.state.value}
                    onChange={event => this.setState({ value: event.target.value })}
                />
            </div>
            <button>Enter</button>
          </form>
          <hr />
            <h4> Ready to pick a winner?</h4>
            <button onClick={this.onClick}> Pick a winner! </button>
          <hr/>
          <h1>{this.state.message}</h1>

        </div>
      );
    }
}

export default App;
