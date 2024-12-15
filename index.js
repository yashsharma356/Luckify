const contractAddress = "0xc8D8e20f92cD71283E7755986Da73A0142FC6b67";
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

let provider, signer, contract;

async function connect() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    await updateUI();
  } else {
    alert("MetaMask is not installed!");
  }
}

async function updateUI() {
  const manager = await contract.manager();
  const players = await contract.getPlayers();
  document.getElementById("manager").innerText = `Manager: ${manager}`;
  const playersList = document.getElementById("players");
  playersList.innerHTML = "";
  players.forEach((player) => {
    const li = document.createElement("li");
    li.innerText = player;
    playersList.appendChild(li);
  });
}

document.getElementById("becomeManager").onclick = async () => {
  try {
    await connect();
    const tx = await contract.becomeManager();
    await tx.wait();
    document.getElementById("status").innerText = "You are now the manager!";
    await updateUI();
  } catch (error) {
    document.getElementById("status").innerText = error.message;
  }
};

document.getElementById("enter").onclick = async () => {
  try {
    await connect();
    const tx = await contract.enter({ value: ethers.utils.parseEther("0.01") });
    await tx.wait();
    document.getElementById("status").innerText = "You joined as a player!";
    await updateUI();
  } catch (error) {
    document.getElementById("status").innerText = error.message;
  }
};

document.getElementById("pickWinner").onclick = async () => {
  try {
    await connect();
    const tx = await contract.pickWinner();
    await tx.wait();
    document.getElementById("status").innerText = "Winner has been picked!";
    await updateUI();
  } catch (error) {
    document.getElementById("status").innerText = error.message;
  }
};
async function updateUI() {
    const manager = await contract.manager();
    const players = await contract.getPlayers();
    const lastWinner = await contract.lastWinner(); // Fetch the last winner's address
    document.getElementById("manager").innerText = `Manager: ${manager}`;
    document.getElementById("players").innerHTML = "";
    players.forEach((player) => {
      const li = document.createElement("li");
      li.innerText = player;
      document.getElementById("players").appendChild(li);
    });
    if (lastWinner !== ethers.constants.AddressZero) {
      document.getElementById("status").innerText = `Last Winner: ${lastWinner}`;
    }
  }
  
  document.getElementById("pickWinner").onclick = async () => {
    try {
      await connect();
      const tx = await contract.pickWinner();
      await tx.wait();
      document.getElementById("status").innerText = "Winner has been picked!";
      await updateUI();
    } catch (error) {
      document.getElementById("status").innerText = error.message;
    }
  };
  

connect();
