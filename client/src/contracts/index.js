
import Web3 from 'web3';
  const  escrowAddress = "0xF016d2A87bA95536E1641904496EbF5FFC8EA6df";
  const escrowAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "agree",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_payee",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_arbitrator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "newAgreement",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "releaseFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "agreements",
		"outputs": [
			{
				"internalType": "address",
				"name": "payer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "payee",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "arbitrator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "payerAgreed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "payeeAgreed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "fundsDeposited",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const web3 = new Web3(new Web3.providers.HttpProvider('https://your.ethereum.node.url'));



const escrowContract = new web3.eth.Contract(escrowAbi, escrowAddress);

async function newAgreement(_payee, _arbitrator, _amount, fromAddress) {
    const result = await escrowContract.methods.newAgreement(_payee, _arbitrator, _amount).send({ from: fromAddress });
    return result.events.AgreementCreated.returnValues; // Adjust based on ABI event structure
}

async function deposit(_id, amount, fromAddress) {
    const result = await escrowContract.methods.deposit(_id).send({ from: fromAddress, value: amount });
    return result;
}

async function agree(_id, fromAddress) {
    const result = await escrowContract.methods.agree(_id).send({ from: fromAddress });
    return result;
}

async function releaseFunds(_id, fromAddress) {
    const result = await escrowContract.methods.releaseFunds(_id).send({ from: fromAddress });
    return result;
}

module.exports = {
    newAgreement,
    deposit,
    agree,
    releaseFunds
};

