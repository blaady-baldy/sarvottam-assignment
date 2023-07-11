// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract NFTDAO is  Ownable, ERC721Enumerable {
    struct Proposal {
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        mapping(address => bool) hasVoted;
        bool isApproved;
    }

    mapping(uint256 => Proposal) public proposals;

    uint256 public proposalCounter;
    uint256 owners=0;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    }

    function mint(address _to) public onlyOwner {

        uint256 tokenId = totalSupply() + 1;
        if (balanceOf(_to) == 0 ){
            owners++;
        }
        _safeMint(_to, tokenId);
    }

    function createProposal(string memory _description) public onlyOwner {
        uint256 proposalId = proposalCounter + 1;
        proposals[proposalId].description = _description;
        proposalCounter++;
    }

    function vote(uint256 _proposalId, bool _supportsProposal) public {
        require(balanceOf(msg.sender) > 0, "You must own the token to vote.");

        require(_proposalId > 0 && _proposalId <= proposalCounter, "There is no active proposal for the token.");

        require(!proposals[_proposalId].hasVoted[msg.sender], "You have already voted for this proposal.");
        proposals[_proposalId].hasVoted[msg.sender] = true;

        if (_supportsProposal) {
            proposals[_proposalId].yesVotes++;
        } else {
            proposals[_proposalId].noVotes++;
        }

        if( proposals[_proposalId].yesVotes > owners/2){
            proposals[_proposalId].isApproved = true;
        }
    }

    function getProposal(uint256 _proposalId) public view returns (string memory, uint256, uint256, bool) {
    require(_proposalId <= proposalCounter, "Invalid proposal ID.");

    Proposal storage proposal = proposals[_proposalId];
    return (proposal.description, proposal.yesVotes, proposal.noVotes, proposal.isApproved);
}

}
