const contractAddress = "0x6B5B798584C396f901CDba60aBA37c0F01719885";
const contractABI = [
	{
		"inputs": [],
		"name": "becomeManager",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "enter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "getPlayers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastWinner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manager",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let web3, contract;

async function connect() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum); // Initialize Web3 with MetaMask's provider
    await window.ethereum.request({ method: "eth_requestAccounts" }); // Request account access
    contract = new web3.eth.Contract(contractABI, contractAddress); // Initialize the contract
    await updateUI();
  } else {
    alert("MetaMask is not installed!");
  }
}

async function updateUI() {
  try {
    const accounts = await web3.eth.getAccounts();
    const manager = await contract.methods.manager().call();
    const players = await contract.methods.getPlayers().call();
    const lastWinner = await contract.methods.lastWinner().call();

    document.getElementById("manager").innerText = `Manager: ${manager}`;
    const playersList = document.getElementById("players");
    playersList.innerHTML = "";
    players.forEach((player) => {
      const li = document.createElement("li");
      li.innerText = player;
      playersList.appendChild(li);
    });

    if (lastWinner !== "0x0000000000000000000000000000000000000000") {
      document.getElementById("status").innerText = `Last Winner: ${lastWinner}`;
    }
  } catch (error) {
    console.error("Failed to update UI:", error);
  }
}

document.getElementById("becomeManager").onclick = async () => {
  try {
    await connect();
    const accounts = await web3.eth.getAccounts();
    await contract.methods.becomeManager().send({ from: accounts[0] });
    document.getElementById("status").innerText = "You are now the manager!";
    await updateUI();
  } catch (error) {
    document.getElementById("status").innerText = error.message;
  }
};

document.getElementById("enter").onclick = async () => {
  try {
    await connect();
    const accounts = await web3.eth.getAccounts();
    await contract.methods.enter().send({ from: accounts[0], value: web3.utils.toWei("0.01", "ether") });
    document.getElementById("status").innerText = "You joined as a player!";
    await updateUI();
  } catch (error) {
    document.getElementById("status").innerText = error.message;
  }
};

document.getElementById("pickWinner").onclick = async () => {
  try {
    await connect();
    const accounts = await web3.eth.getAccounts();
    await contract.methods.pickWinner().send({ from: accounts[0] });
    document.getElementById("status").innerText = "Winner has been picked!";
    await updateUI();
  } catch (error) {
    document.getElementById("status").innerText = error.message;
  }
};

// Automatically connect on page load
window.onload = async () => {
  try {
    await connect();
  } catch (error) {
    console.error("Failed to connect on load:", error);
  }
};

