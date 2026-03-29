# Figma REST API — Rate Limits Reference

> Last verified: 2026-03-27 against Figma API documentation and real-world testing.

## Endpoint Tiers

Figma groups API endpoints into tiers with separate rate limits:

| Tier       | Endpoints                      | What they do                            |
| ---------- | ------------------------------ | --------------------------------------- |
| **Tier 1** | `GET /v1/files/:key`           | File structure, styles, components      |
|            | `GET /v1/files/:key/nodes`     | Specific nodes with full properties     |
| **Tier 2** | `GET /v1/images/:key`          | Render nodes as PNG/SVG/PDF             |
|            | `GET /v1/files/:key/images`    | List embedded image fills               |
| **Tier 3** | `GET /v1/files/:key/comments`  | Comments                                |
|            | `POST /v1/files/:key/comments` | Post comments                           |
| **Other**  | `GET /v1/me`                   | Current user info (**free, uncounted**) |

## Limits by Plan and Seat Type

### Tier 1 (GET /files, GET /files/nodes)

| Plan             | Seat Type       | Limit              |
| ---------------- | --------------- | ------------------ |
| **Starter**      | View            | **6 per month** 🚫 |
| **Starter**      | Full Design     | 10 per minute      |
| **Professional** | View            | **6 per month** 🚫 |
| **Professional** | Full Design     | 10 per minute      |
| **Organization** | View            | **6 per month** 🚫 |
| **Organization** | Full Design/Dev | 15 per minute      |
| **Enterprise**   | Full Design/Dev | 30 per minute      |

### Tier 2 (GET /images, GET /files/images)

| Plan             | Seat Type | Limit         |
| ---------------- | --------- | ------------- |
| **Starter**      | View      | 5 per minute  |
| **Starter**      | Full      | 25 per minute |
| **Professional** | View      | 5 per minute  |
| **Professional** | Full      | 25 per minute |
| **Organization** | Full/Dev  | 30 per minute |
| **Enterprise**   | Full/Dev  | 60 per minute |

## HTTP 429 Response

When rate limited, Figma returns:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
```

- `Retry-After: 60` — per-minute limit, wait and retry
- `Retry-After: 2592000` (30 days) — **monthly quota exhausted**, don't retry

## Mitigation Strategy

The `extract_figma.py` script uses exactly **2 Tier 1 calls** per run:

1. **Call 1**: `GET /files/:key?depth=2` → file overview with all page/frame IDs
2. **Call 2**: `GET /files/:key/nodes?ids=x,y,z` → batch ALL frame IDs in one request

This means on a Starter/View seat, you can run the full extraction **3 times per month**.

All image exports (PNG screenshots, SVG icons, embedded photos) use Tier 2 calls, which have higher limits.

## Safe API Token Test

To verify your token without spending Tier 1 quota:

```bash
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" https://api.figma.com/v1/me | jq .
```

## Official Documentation

- [Rate limits](https://www.figma.com/developers/api#rate-limits)
- [Authentication](https://www.figma.com/developers/api#access-tokens)
- [Files endpoint](https://www.figma.com/developers/api#files)
- [Images endpoint](https://www.figma.com/developers/api#images)
