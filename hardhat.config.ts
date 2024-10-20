import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "london",
    },
  },
  networks: {
    // opencampus: {
    //   url: `https://open-campus-codex-sepolia.drpc.org/`,
    //   accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
    // scrollTestnet: {
    //   url: process.env.SCROLL_TESTNET_URL || "",
    //   chainId: 534351,
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
    neoTestnet: {
      url: `https://testnet.rpc.banelabs.org`,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 12227332,
      gasPrice: 60000000000,
    },
    aia: {
      url: 'https://aia-dataseed1-testnet.aiachain.org',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 1320,
    }
  },
};

export default config;
