// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Escrow {

  
    struct Agreement {
        address payer;
        address payee;
        address arbitrator;
        uint256 amount;
        bool payerAgreed;
        bool payeeAgreed;
        bool fundsDeposited;
    }

  
    Agreement[] public agreements;

    function newAgreement(address _payee, address _arbitrator, uint256 _amount) external returns (uint256) {
        require(_payee != msg.sender, "Payer and Payee cannot be the same");
        require(_arbitrator != address(0), "Arbitrator address cannot be zero");
        agreements.push(Agreement({
            payer: msg.sender,
            payee: _payee,
            arbitrator: _arbitrator,
            amount: _amount,
            payerAgreed: false,
            payeeAgreed: false,
            fundsDeposited: false
        }));
        return agreements.length - 1;
    }

    
    function deposit(uint256 _id) external payable {
        Agreement storage agreement = agreements[_id];
        require(msg.sender == agreement.payer, "Only the payer can deposit funds");
        require(!agreement.fundsDeposited, "Funds already deposited");
        require(msg.value == agreement.amount, "Incorrect deposit amount");
        
        agreement.fundsDeposited = true;
    }

   
    function agree(uint256 _id) external {
        Agreement storage agreement = agreements[_id];
        require(msg.sender == agreement.payer || msg.sender == agreement.payee, "Only payer or payee can agree");
        
        if (msg.sender == agreement.payer) {
            agreement.payerAgreed = true;
        } else {
            agreement.payeeAgreed = true;
        }
    }

  
    function releaseFunds(uint256 _id) external {
        Agreement storage agreement = agreements[_id];
        require(msg.sender == agreement.arbitrator, "Only the arbitrator can release funds");
        require(agreement.payerAgreed && agreement.payeeAgreed, "Both parties must agree to release funds");
        require(agreement.fundsDeposited, "Funds must be deposited before release");

        payable(agreement.payee).transfer(agreement.amount);
        agreement.fundsDeposited = false; 
        agreement.payerAgreed = false;    
        agreement.payeeAgreed = false;   
    }
}
