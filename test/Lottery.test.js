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




});
