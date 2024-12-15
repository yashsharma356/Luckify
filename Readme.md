# Luckify: Decentralized Lottery DApp 🎟️

**Luckify** is a decentralized lottery application built on Ethereum, allowing users to participate in a transparent and fair lottery system powered by smart contracts. 

---

## 🎯 Features

- **Become a Manager:** Any user can opt to become the lottery manager, responsible for selecting the winner.
- **Join as a Player:** Users can enter the lottery by contributing a small amount of Ether (e.g., 0.01 ETH).
- **Random Winner Selection:** The smart contract selects a random winner from the participants, ensuring fairness.
- **Transparent History:** Displays the latest winner on the frontend after every round.
- **Decentralized:** Built on Ethereum for transparent and trustless operations.

---

### Contract Details

- **Transaction Hash**: `0x1facbedf4d72627d39bfba6fb3753623257f19faadd35e9ac06e370da4185f0e`
- **Sender Address**: `0x7c4c26e16031ef4d298582ff295c31eaa0b04110d5f54bc546130c4173344f42`
- **Network**: Mantle Sepolia Testnet
- **Module**: `CryptoRadar`

### Deployment

- **Transaction Hash**: [Link](https://explorer.aptoslabs.com/txn/0x1facbedf4d72627d39bfba6fb3753623257f19faadd35e9ac06e370da4185f0e/userTxnOverview?network=devnet)
- **Coin Used**: MNT


---

## 🌟 How It Works

1. **Manager Setup:**
   - Any user can become the manager by clicking the "Become Manager" button.
   - The manager has the exclusive right to pick a winner.

2. **Joining the Lottery:**
   - Players enter the lottery by sending 0.01 ETH through the "Join as Player" button.
   - Each player's address is stored in the contract.

3. **Selecting a Winner:**
   - The manager triggers the "Pick Winner" button to randomly select a winner.
   - The contract transfers the entire prize pool to the winner.
   - The winner's address is displayed in the DApp interface.

---

## ✨ User Roles

1. **Manager:** 
   - Becomes the lottery manager.
   - Can pick a winner.
   - Limited to one manager per round.

2. **Players:**
   - Join the lottery with 0.01 ETH.
   - Can win the entire prize pool.

---

## 📂 Project Structure

```plaintext
.
├── contract/
│   └── LotteryGame.sol       # Solidity smart contract
├── index.html                # Frontend HTML
├── index.js                  # Frontend logic with Ethers.js
├── styles.css                # Frontend styles
└── README.md                 # Project documentation
