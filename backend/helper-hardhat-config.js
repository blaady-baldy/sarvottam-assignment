const networkConfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
    }
}

// const INITIAL_ENTRY_TOKEN_URI =
//      //reputation = 0 ; properties owned = 0 ; dealtokens = 0 ; warnings = 0;

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains
}