// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.0;

// contract P2PEscrow {

// // Address of the payer

// address payable public payerAddress;

// // Address of the payee

// address payable public payeeAddress;

// // Address of the escrow agent

// address payable public escrowAgent;

// // Amount of the contract

// uint public contractAmount;

// // Flag indicating if the payer approved the payment

// bool public payerApproved;

// // Flag indicating if the payee approved the payment

// bool public payeeApproved;

// // Flag indicating if the contract was canceled

// bool public contractCanceled;

// // Constructor function


// function invoker(address payable _payerAddress, address payable _payeeAddress, address payable _escrowAgent, uint _contractAmount) public payable {
//  require(_contractAmount > 0, "Contract amount must be greater than zero");



// payerAddress = _payerAddress;

// payeeAddress = _payeeAddress;

// escrowAgent = _escrowAgent;

// contractAmount = _contractAmount;
// }


// function approvePayment() public {

// if (msg.sender == payerAddress) {

// // Set the payer approval flag to true

// payerApproved = true;

// }



// // If both parties have approved and the contract was not canceled, transfer the funds to the escrow agent

// if (payerApproved && !contractCanceled) {

// escrowAgent.transfer(contractAmount);

// }

// }

// // Cancel payment function

// function cancelPayment() public {

// // Require that only the escrow agent can cancel the payment

// require(msg.sender == escrowAgent, "Only the escrow agent can cancel the payment");

// // Require that the payment has not been approved by either party

// require(!payerApproved && !payeeApproved, "Payment has already been approved by one of the parties");

// // Refund the contract amount to the payer

// payerAddress.transfer(contractAmount);

// // Set the contract canceled flag to true

// contractCanceled = true;

// }

// // Get contract status function

// function getContractStatus() public view returns (bool, bool, bool) {

// // Return the payer approval, payee approval, and contract canceled flags

// return (payerApproved, payeeApproved, contractCanceled);

// }

// // Get payer address function

// function getPayerAddress() public view returns (address payable) {

// return payerAddress;

// }

// // Get payee address function

// function getPayeeAddress() public view returns (address payable) {

// return payeeAddress;

// }

// // Get escrow agent function

// function getEscrowAgent() public view returns (address payable) {

// return escrowAgent;

// }

// // Get contract amount function

// function getContractAmount() public view returns (uint) {

// return contractAmount;

// }

// }




pragma solidity ^0.8.0;

contract P2PEscrow {
    address payable public payerAddress;
    address payable public payeeAddress;
    address payable public escrowAgent;
    uint public contractAmount;
    bool public payerApproved;
    bool public payeeApproved;
    bool public contractCanceled;
    bool public contractCompleted;

    constructor(address payable _payeeAddress, address payable _escrowAgent) payable {
        require(msg.value > 0, "Contract amount must be greater than zero");

        payerAddress = payable(msg.sender);
        payeeAddress = _payeeAddress;
        escrowAgent = _escrowAgent;
        contractAmount = msg.value;
    }

    function approvePayment() public {
        require(!contractCanceled, "Contract has been canceled");
        require(!contractCompleted, "Contract has already been completed");

        if (msg.sender == payerAddress) {
            payerApproved = true;
        } else if (msg.sender == payeeAddress) {
            payeeApproved = true;
        } else {
            revert("Only payer or payee can approve the payment");
        }

        if (payerApproved && payeeApproved) {
            payeeAddress.transfer(contractAmount);
            contractCompleted = true;
        }
    }

    function cancelPayment() public {
        require(msg.sender == escrowAgent, "Only the escrow agent can cancel the payment");
        require(!payerApproved && !payeeApproved, "Payment has already been approved by one of the parties");
        require(!contractCanceled, "Contract has already been canceled");
        require(!contractCompleted, "Contract has already been completed");

        payerAddress.transfer(address(this).balance);
        contractCanceled = true;
    }

    function getContractStatus() public view returns (bool, bool, bool, bool) {
        return (payerApproved, payeeApproved, contractCanceled, contractCompleted);
    }

    function getPayerAddress() public view returns (address payable) {
        return payerAddress;
    }

    function getPayeeAddress() public view returns (address payable) {
        return payeeAddress;
    }

    function getEscrowAgent() public view returns (address payable) {
        return escrowAgent;
    }

    function getContractAmount() public view returns (uint) {
        return contractAmount;
    }
}
    

    function cancelPayment() public {
        require(msg.sender == escrowAgent, "Only the escrow agent can cancel the payment");
        require(!payerApproved && !payeeApproved, "Payment has already been approved by one of the parties");
        require(!contractCanceled, "Contract has already been canceled");
        require(!contractCompleted, "Contract has already been completed");

        payerAddress.transfer(address(this).balance);
        contractCanceled = true;
    }

    function getContractStatus() public view returns (bool, bool, bool, bool) {
        return (payerApproved, payeeApproved, contractCanceled, contractCompleted);
    }

    function getPayerAddress() public view returns (address payable) {
        return payerAddress;
    }

    function getPayeeAddress() public view returns (address payable) {
        return payeeAddress;
    }

    function getEscrowAgent() public view returns (address payable) {
        return escrowAgent;
    }

    function getContractAmount() public view returns (uint) {
        return contractAmount;
    }
}