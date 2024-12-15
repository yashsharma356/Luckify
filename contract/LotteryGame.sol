// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Lottery {
    address public manager;
    address[] public players;
    address public lastWinner; // Store the last winner's address

    function becomeManager() public {
        require(manager == address(0), "Manager already exists");
        manager = msg.sender;
    }

    function enter() public payable {
        require(manager != address(0), "Manager not set yet");
        require(msg.value == 0.01 ether, "Entry fee is 0.01 ether");
        players.push(msg.sender);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function pickWinner() public onlyManager {
        require(players.length > 0, "No players entered");
        uint winnerIndex = random() % players.length;
        address winner = players[winnerIndex];
        payable(winner).transfer(address(this).balance);
        lastWinner = winner; // Update the winner's address
        delete players; // Correctly reset the players array
    }


    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, players)));
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only the manager can call this");
        _;
    }

    receive() external payable {}
}
