// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC721.sol";

contract VerifyNftOwnership {
    function walletHoldsToken(address _wallet, address _contract, uint256 tokenId) public view returns (bool) {
        return IERC721(_contract).ownerOf(tokenId) == _wallet;
    }
}