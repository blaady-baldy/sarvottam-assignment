const { expect } = require("chai");

describe("NFTDAO", function () {
  let NFTDAO;
  let nftdao;
  let owner;
  let addr1;
  let addr2;
  let addr3;

  beforeEach(async function () {
    NFTDAO = await ethers.getContractFactory("NFTDAO");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    nftdao = await NFTDAO.deploy("NFTDAO", "NFT");
    await nftdao.deployed();
  });

  it("Should mint NFT", async function () {
    await nftdao.mint(addr1.address);
    await nftdao.mint(addr2.address);
    expect(await nftdao.balanceOf(addr1.address)).to.equal(1);
    expect(await nftdao.balanceOf(addr2.address)).to.equal(1);
  });

  it("Should create a proposal", async function () {
    await nftdao.createProposal("Test Proposal 1");
    await nftdao.createProposal("Test Proposal 2");
    expect(await nftdao.proposalCounter()).to.equal(2);
  });

  it("Should vote on a proposal", async function () {
    await nftdao.mint(addr1.address);
    await nftdao.mint(addr2.address);
    await nftdao.createProposal("Test Proposal");
    await nftdao.connect(addr1).vote(1, true); // addr1 votes in favor
    await nftdao.connect(addr2).vote(1, false); // addr2 votes against
    const [proposalDescription, yesVotes, noVotes, isApproved] = await nftdao.getProposal(1);

    expect(proposalDescription).to.equal("Test Proposal");
    expect(yesVotes).to.equal(1);
    expect(noVotes).to.equal(1);
    // const proposal = await nftdao.getProposal(1);
    // expect(proposal[1]).to.equal(1);
    // expect(proposal[2]).to.equal(1);
  });

  it("Should approve a proposal", async function () {
    await nftdao.mint(addr1.address);
    await nftdao.mint(addr2.address);
    await nftdao.mint(addr3.address);
    await nftdao.createProposal("Test Proposal");
    await nftdao.connect(addr1).vote(1, true); // addr1 votes in favor
    await nftdao.connect(addr2).vote(1, true); // addr2 votes in favor
    await nftdao.connect(addr3).vote(1, false);
    // console.log("Voted successfully")
    const proposal = await nftdao.getProposal(1);
    const [proposalDescription, yesVotes, noVotes, isApproved] = await nftdao.getProposal(1);
    expect(isApproved).to.equal(true);
  });

  it("Should reject a proposal", async function () {
    await nftdao.mint(addr1.address);
    await nftdao.mint(addr2.address);
    await nftdao.mint(addr3.address);
    await nftdao.createProposal("Test Proposal");
    await nftdao.connect(addr1).vote(1, true); // addr1 votes in favor
    await nftdao.connect(addr2).vote(1, false); // addr2 votes in favor
    await nftdao.connect(addr3).vote(1, false);
    // console.log("Voted successfully")
    const proposal = await nftdao.getProposal(1);
    const [proposalDescription, yesVotes, noVotes, isApproved] = await nftdao.getProposal(1);
    expect(isApproved).to.equal(false);
  });

  it("Should not allow duplicate votes", async function () {
    await nftdao.mint(addr1.address);
    await nftdao.createProposal("Test Proposal");
    await nftdao.connect(addr1).vote(1, true); // addr1 votes in favor
    await expect(nftdao.connect(addr1).vote(1, true)).to.be.revertedWith(
      "You have already voted for this proposal."
    );
  });

it("Should not allow non-owners to mint NFT", async function () {
  await expect(nftdao.connect(addr1).mint(addr1.address)).to.be.revertedWith(
    "Ownable: caller is not the owner"
  );
});

it("Should not allow non-owners to create a proposal", async function () {
  await expect(nftdao.connect(addr1).createProposal("Test Proposal")).to.be.revertedWith(
    "Ownable: caller is not the owner"
  );
});

it("Should not allow voting on non-existing proposals", async function () {
  await nftdao.mint(addr1.address);
  await expect(nftdao.connect(addr1).vote(2, true)).to.be.revertedWith(
    "There is no active proposal for the token."
  );
});

it("Should not allow non-NFT owners to vote", async function () {
  await nftdao.createProposal("Test Proposal");
  await expect(nftdao.vote(1, true)).to.be.revertedWith(
    "You must own the token to vote."
  );
});

it("Should not allow retrieving an invalid proposal", async function () {
  await expect(nftdao.getProposal(1)).to.be.revertedWith(
    "Invalid proposal ID."
  );
});

it("Should increment proposal counter correctly", async function () {
  await nftdao.createProposal("Test Proposal 1");
  await nftdao.createProposal("Test Proposal 2");
  await nftdao.createProposal("Test Proposal 3");
  expect(await nftdao.proposalCounter()).to.equal(3);
});

it("Should handle multiple proposals and votes correctly", async function () {
  await nftdao.mint(addr1.address);
  await nftdao.mint(addr2.address);
  await nftdao.mint(addr3.address);
  await nftdao.createProposal("Test Proposal 1");
  await nftdao.createProposal("Test Proposal 2");

  await nftdao.connect(addr1).vote(1, true);
  await nftdao.connect(addr2).vote(2, false); 

  await nftdao.connect(addr3).vote(1, false);
  await nftdao.connect(addr1).vote(2, true);

  await nftdao.connect(addr2).vote(1, true);
  await nftdao.connect(addr3).vote(2, false);  

  const proposal1 = await nftdao.getProposal(1);
  const proposal2 = await nftdao.getProposal(2);

  expect(proposal1[1]).to.equal(2);
  expect(proposal1[2]).to.equal(1);
  expect(proposal1[3]).to.equal(true);

  expect(proposal2[1]).to.equal(1);
  expect(proposal2[2]).to.equal(2);
  expect(proposal2[3]).to.equal(false);
});

});
