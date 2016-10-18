pragma solidity ^0.4.1;

import 'Owned.sol';

contract Person is Owned{

    bytes32 private first_name;
    bytes32 private last_name;

    function Person(bytes32 _first_name, bytes32 _last_name) {
        owner = msg.sender;
        first_name = _first_name;
        last_name = _last_name;
    }

}
