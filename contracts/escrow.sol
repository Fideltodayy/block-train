// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Escrow {
    //address owner;

  
    struct Agreement {
        address payer;
        address payee;
       // address arbitrator;
        uint256 amount;
        bool payerAgreed;
        bool payeeAgreed;
        bool fundsDeposited;
    }
    mapping(uint256 key => Agreement) public agreements;
    uint256 public agreementIndex;
    //mapping to track user balance
    //combine creation or agreement with fund deposit
    //payer functions => create, release

    /****
    *function setModerator
     */

     /****
     function request updated payeeAgree
      */

      /***
      Function approve  set payerAgreed -> call release fund function
       */

/***
Modifier to check  if owner
 */

 //Function refund only owner



  
    Agreement[] public agreements;

    //new func
    function newagr(address _payee,uint256 _amount)public payable{
        require(_payee != address(0),"invalid address");
        require(_payee != msg.sender, "Payer and Payee cannot be the same");
        
        require(msg.value == _amount,"insuf balance");
        uint256 index = agreementIndex;
        agreements[index] = Agreement({payee:_payee,payer:msg.sender,amount:_amount,})

    }

    function newAgreement(address _payee, address _arbitrator, uint256 _amount) external returns (uint256) {
        require(_payee != msg.sender, "Payer and Payee cannot be the same");
        require(_arbitrator != address(0), "Arbitrator address cannot be zero");
        agreements.push(Agreement({
            payer: msg.sender,
            payee: _payee,
            arbitrator: _arbitrator, //address(this)
            amount: _amount,
            payerAgreed: false,
            payeeAgreed: false,
            fundsDeposited: false
        }));
        return agreements.length - 1;
    }

    
    //
    function depositt(uint256 _id) internal payable {
        Agreement storage agreement = agreements[_id];
        require(msg.sender == agreement.payer, "Only the payer can deposit funds");
        require(!agreement.fundsDeposited, "Funds already deposited");
        require(msg.value == agreement.amount, "Incorrect deposit amount");
        
        agreement.fundsDeposited = true;
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
