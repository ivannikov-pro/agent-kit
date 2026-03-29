---
name: solidity-contracts
description: Conventions and architecture for Solidity smart contracts in this project (packages/contracts). Covers contract structure, standards, tooling, and deployment patterns. Use when writing, reviewing, or deploying Solidity code.
category: development
risk: safe
source: local
tags: [solidity, foundry, hardhat, erc1155, erc721a, upgradeable, bsc]
tools: [claude, cursor, gemini, antigravity, copilot, windsurf, kiro]
date_added: "2026-03-28"
metadata:
  version: "1.1.0"
---

# Solidity Smart Contracts Skill

> **Source:** onchain-giveaway-platform repository
> **Skill updated:** 2026-03-28

## When to Use

- Writing or reviewing Solidity smart contracts
- Setting up Foundry/Hardhat build and test pipelines
- Deploying upgradeable proxy contracts on BSC
- Understanding the contract architecture (Factory, Sale, Cards, Tickets)
- Working with Chainlink VRF integration

## When NOT to Use

- Frontend-only changes with no contract interaction
- Non-Solidity backend services

## Project Context

This is an on-chain giveaway (raffle) platform on **BSC (BNB Chain)** where users buy collectible cards (ERC1155) and receive raffle tickets (ERC721A) for a chance to win luxury goods.

## Tech Stack

| Tool                | Version / Details                         |
| ------------------- | ----------------------------------------- |
| **Solidity**        | 0.8.34                                    |
| **Foundry (Forge)** | Primary build & test tool                 |
| **Hardhat**         | 3.1.12+ (secondary, for scripts/deploy)   |
| **EVM target**      | `osaka`                                   |
| **Compiler**        | `viaIR = true`, optimizer 200 runs        |
| **OpenZeppelin**    | 5.6.1 (contracts + contracts-upgradeable) |
| **ERC721A**         | 4.3.0 (erc721a-upgradeable for Tickets)   |
| **Chainlink**       | @chainlink/contracts 1.4.0 (VRF)          |
| **Payment token**   | USDT BEP20 (mono-currency)                |

## Directory Structure

```
packages/contracts/
├── contracts/        ← Solidity source files
├── test/             ← Forge tests (Solidity)
├── script/           ← Forge deploy scripts
├── artifacts/        ← Compiled output (out)
├── cache_forge/      ← Forge cache
├── lib/              ← Git submodules (forge-std)
├── foundry.toml      ← Forge config
├── hardhat.config.ts ← Hardhat config
└── remappings.txt    ← Import remappings
```

## Contract Architecture

All contracts are **Transparent Upgradeable proxies**.

```
Factory (creates Sale proxies per giveaway)
├── Sale (state machine: Paused → Sale → Draw → Award → Buyback)
│   ├── Cards (ERC1155 Upgradeable) — collectible cards + Winner NFT
│   └── Tickets (ERC721A Upgradeable) — raffle tickets for VRF
├── PaymentGateway — routes fiat payments from Wert.io
└── Selector — Chainlink VRF integration for random winner
```

### Key Contracts

| Contract           | Standard                      | Purpose                                  |
| ------------------ | ----------------------------- | ---------------------------------------- |
| **Factory**        | Transparent Proxy Upgradeable | Creates Sale proxies, stores impl addrs  |
| **Sale**           | Transparent Proxy Upgradeable | Buy, refund, cashout, state machine      |
| **Cards**          | ERC1155 Upgradeable           | Collectible cards (mint/burn via Sale)   |
| **Tickets**        | ERC721A Upgradeable           | Raffle tickets for VRF winner selection  |
| **PaymentGateway** | Transparent Proxy Upgradeable | Routes USDT payments (Wert.io fiat path) |
| **Selector**       | Transparent Proxy + VRF       | Chainlink VRF → picks winning ticket     |

### State Machine (Sale)

```
Paused → Sale → Draw → Award → Buyback
```

- **Paused**: initial, admin can configure
- **Sale**: users buy cards → mint Cards + Tickets
- **Draw**: sale ended, trigger VRF to select winner
- **Award**: winner selected, can claim prize or cashout
- **Buyback**: if minThreshold not met → users burn cards, claim USDT refund

## Import Remappings

```
forge-std/         → lib/forge-std/src/
@openzeppelin/     → node_modules/@openzeppelin/
@chainlink/        → node_modules/@chainlink/
```

## Coding Conventions

1. **Naming**: PascalCase for contracts, camelCase for functions/variables, UPPER_SNAKE for constants
2. **Errors**: Use custom errors (`error InsufficientBalance()`) instead of require strings
3. **Events**: Emit events for every state change
4. **NatSpec**: All public/external functions must have `@notice`, `@param`, `@return` comments
5. **Access control**: Use OpenZeppelin `AccessControlUpgradeable` or `OwnableUpgradeable`
6. **Proxy pattern**: Transparent Proxy — admin managed by `ProxyAdmin` contract
7. **Storage**: Use storage gaps (`uint256[50] private __gap`) for upgrade safety
8. **Tests**: Forge tests in Solidity, use `forge-std/Test.sol` base

## Common Commands

```bash
# All commands run from packages/contracts/

# Build contracts
forge build

# Run all tests
forge test

# Run tests with verbosity
forge test -vvv

# Run specific test
forge test --match-contract SaleTest --match-test testBuyCards -vvv

# Gas report
forge test --gas-report

# Format Solidity
forge fmt

# Check formatting
forge fmt --check

# Generate sizes
forge build --sizes
```

## ⚠️ Gotchas

- **No `immutable` in upgradeable contracts** — immutables are baked into runtime bytecode and break upgrade detection
- **No `@author` NatSpec tag** — we don't use author tags in contract comments
- **Always run `forge fmt`** — never manually format Solidity; let Foundry handle it
- **Use ERC-7201 namespaced storage** — all state in upgradeable contracts must use namespaced storage patterns
- **Import remappings** — OpenZeppelin and Chainlink are in `node_modules/`, not `lib/`; check `remappings.txt`
- **Transparent Proxy pattern** — admin managed by separate `ProxyAdmin` contract; don't confuse with UUPS

