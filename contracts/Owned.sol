pragma solidity ^0.4.1;

contract Owned {

    address owner;

    modifier fromOwner() {
        if (msg.sender != owner)
			_;
    }

    function getOwner() constant returns (address) {
        return owner;
    }

}
