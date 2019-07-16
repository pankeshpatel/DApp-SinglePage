const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Constructor function

const provider = ganache.provider();
const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};
const web3 = new Web3(provider, null, OPTIONS);

const { interface, bytecode } = require('../compile');

let accounts;
let lottery;

beforeEach(async () => {
	//Get a list of all accounts
	accounts = await web3.eth.getAccounts();

  console.log(accounts);

	// This deploy the lottery contract
	lottery = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode})
		.send({from: accounts[0], gas: '1000000'});

});


describe('Lottery Contract', () => {

  it('deploys a contract', () => {
		assert.ok(lottery.options.address);
	});

  it('allows one account to enter', async() => {
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei('0.02', 'ether')
		});

		const players = await lottery.methods.getPlayers().call({
			from: accounts[0]
		});

		assert.equal(accounts[0], players[0]);
		assert.equal(1, players.length);

	});


  it('allows multiple accounts to enter', async() => {

		// for account[0]
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei('0.02', 'ether')
		});

		//for account[1]
		await lottery.methods.enter().send({
			from: accounts[1],
			value: web3.utils.toWei('0.02', 'ether')
		});


		const players = await lottery.methods.getPlayers().call({
			from: accounts[0]
		});

		assert.equal(accounts[0], players[0]);
		assert.equal(accounts[1], players[1]);
		assert.equal(2, players.length);

	});

  it('requires a minimum amount of ether to enter', async() => {
	   try{
		await lottery.methods.enter().send({
			from : accounts[0],
			value : 0
		});
		//assert(false);
	   }catch (err){
		  assert(err);

	   }
	});

  it('Only manager can pickWinner', async() => {
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei('0.02', 'ether')
		});

		await lottery.methods.pickWinner().send(
			{
				from : accounts[0]
		});
	});

	it('sends money to the winnner and resets the players array', async() => {

		const originalBalance = await web3.eth.getBalance(accounts[0]);
		console.log('Original Balance in account[0]', originalBalance);

		// account[0] is sending money to BC
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei('2', 'ether')
		});

		// Checking account[0] balance
		// Here, the balance will be 2 ether less than original
		const initialBalance = await web3.eth.getBalance(accounts[0]);
		console.log('Initial Balance in account[0]', initialBalance);

		// calling pickWinner().
		// Since there is only one participant.
		// So, account[0] will be declared a winner
		// 2 ether will be credited to account[0]
		await lottery.methods.pickWinner().send(
		{
				from: accounts[0]
		});

		// finalBalance of account[0] will be more less the same
		const finalBalance = await web3.eth.getBalance(accounts[0]);
		console.log('Final Balance in account[0]', finalBalance);
		const difference = finalBalance - initialBalance;
		assert(difference > web3.utils.toWei('1.8', 'ether'));

	});




});
