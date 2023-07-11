# NFTDAO Project
The purpose of this assignment is to assess your skills and experience in developing ERC721 NFT-governed DAOs. The project involves creating a DApp using React for the frontend and Node.js with Hardhat for the backend. The DAO will be used to manage a collection of NFTs, and it will allow the owners of the NFTs to vote on decisions related to the collection.

## Smart Contract
The project includes a smart contract named NFTDAO.sol. This contract inherits from the Ownable and ERC721Enumerable contracts provided by the OpenZeppelin library. The contract features the following functionalities:

## Structures
- Proposal: A structure representing a proposal with a description, number of yes votes, number of no votes, a mapping to track voting status of addresses, and an approval status.
- 
### State Variables
- proposals: A mapping that stores proposals by their IDs.
- proposalCounter: A counter to track the number of proposals created.
- owners: A counter to keep track of the number of NFT owners.
- constructor(string memory _name, string memory _symbol): The constructor function to initialize the ERC721 token with the provided name and symbol.
External Functions
- mint(address _to): A function that allows the contract owner to mint an NFT and assign it to the specified address. It increments the token ID and checks if the address already owns a token to increment the owners' count.

- createProposal(string memory _description): A function that enables the contract owner to create a proposal by providing a description. It increments the proposal ID.

- vote(uint256 _proposalId, bool _supportsProposal): A function that allows NFT owners to vote on a proposal. It checks if the caller owns a token, verifies the proposal ID's validity, and prevents duplicate voting. It increments the respective vote count based on the voting choice and approves the proposal if it receives more than half of the owners' votes.

### View Functions
- getProposal(uint256 _proposalId): A function to retrieve the details of a specific proposal by providing its ID.
Development Setup

