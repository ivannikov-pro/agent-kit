---
description: How to generate a gas usage report for smart contracts
---

# Gas Report

Run from `packages/contracts/`.

// turbo-all

1. Generate gas report:

```bash
cd packages/contracts && forge test --gas-report
```

2. Generate gas snapshot for comparison:

```bash
cd packages/contracts && forge snapshot
```

3. Compare with previous snapshot:

```bash
cd packages/contracts && forge snapshot --diff
```

4. Check contract sizes:

```bash
cd packages/contracts && forge build --sizes
```
