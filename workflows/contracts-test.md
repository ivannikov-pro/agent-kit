---
description: How to build and test smart contracts with Foundry
---

# Build & Test Contracts

All commands run from `packages/contracts/`.

// turbo-all

1. Install dependencies (if not already):

```bash
cd packages/contracts && forge install
```

2. Build contracts:

```bash
cd packages/contracts && forge build
```

3. Run all tests:

```bash
cd packages/contracts && forge test -vvv
```

4. Run a specific test (replace `<ContractTest>` and `<testName>`):

```bash
cd packages/contracts && forge test --match-contract <ContractTest> --match-test <testName> -vvv
```

5. Check formatting:

```bash
cd packages/contracts && forge fmt --check
```

6. Fix formatting:

```bash
cd packages/contracts && forge fmt
```
