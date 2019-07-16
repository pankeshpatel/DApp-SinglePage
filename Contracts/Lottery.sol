pragma solidity ^0.4.17;

contract Lottery {

   // Address of the person, who created the contract
    address public manager;

    // Array of addresses of people who have entered
    address[] public players;


    function Lottery() public {
        manager = msg.sender;
    }

    // Enters a player into the lottery
    // "payable" keyword
    // when someone call this function they might send either along
    function enter() public payable {

        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint){
        return uint(keccak256(block.difficulty, now, players));
    }

    // Randomly pick a winner and
    // sends them a prize pool
    function pickWinner() public restricted {

        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }


}
