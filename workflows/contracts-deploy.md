---
description: How to deploy smart contracts to local/testnet/mainnet
---

# Deploy Contracts

All commands run from `packages/contracts/`.

## Local (Anvil)

1. Start a local Anvil node:

```bash
cd packages/contracts && anvil
```

2. Deploy to local in a separate terminal:

```bash
cd packages/contracts && forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

## BSC Testnet

1. Ensure `.env` has `BSC_TESTNET_RPC_URL` and `DEPLOYER_PRIVATE_KEY` set.

2. Deploy:

```bash
cd packages/contracts && source .env && forge script script/Deploy.s.sol --rpc-url $BSC_TESTNET_RPC_URL --broadcast --verify --etherscan-api-key $BSCSCAN_API_KEY -vvv
```

## BSC Mainnet

> [!CAUTION]
> This deploys to mainnet with real funds. Double-check all parameters.

1. Ensure `.env` has `BSC_MAINNET_RPC_URL` and `DEPLOYER_PRIVATE_KEY` set.

2. Deploy:

```bash
cd packages/contracts && source .env && forge script script/Deploy.s.sol --rpc-url $BSC_MAINNET_RPC_URL --broadcast --verify --etherscan-api-key $BSCSCAN_API_KEY -vvv
```
