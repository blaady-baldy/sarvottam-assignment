const { getNamedAccounts, deployments, network, run, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
// const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    console.log("Deploying NFTDAO Contract")
    const NFTDAO = await deploy("NFTDAO", {
        from: deployer,
        args: ["Hacker DAO","HD"],
        log: true,
    })
    console.log("----------------------------------------------------")
}


module.exports.tags = ["all", "NFTDAO"]