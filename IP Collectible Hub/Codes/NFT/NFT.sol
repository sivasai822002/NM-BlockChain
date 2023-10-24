// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Collectibles is ERC721Enumerable, Ownable {
    using Strings for uint256;

    // Base URI for metadata
    string private _baseTokenURI;

    // Mapping from token ID to IP/Brand info
    mapping(uint256 => string) private _tokenIPInfo;

    constructor(string memory name, string memory symbol, string memory baseTokenURI) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory baseTokenURI) external onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    function createCollectible(address owner, uint256 tokenId, string memory ipInfo) external onlyOwner {
        _mint(owner, tokenId);
        _tokenIPInfo[tokenId] = ipInfo;
    }

    function getIPInfo(uint256 tokenId) external view returns (string memory) {
        return _tokenIPInfo[tokenId];
    }
}