# redmenta-demo-automation

Lightweight end-to-end demo tests for [saucedemo.com](https://www.saucedemo.com/), written with [Playwright](https://playwright.dev/).

## Scenarios

| # | Scenario | Checks |
|---|----------|--------|
| 1 | Standard user logs in | Lands on the inventory page with 6 products |
| 2 | Locked out user logs in | Error message is shown, login is refused |
| 3 | Standard user buys a backpack | Cart badge shows 1, order ends with "Thank you for your order!" |

All three live in [`tests/saucedemo.spec.ts`](tests/saucedemo.spec.ts).

## Setup

Requires Node.js 20 or newer.

```bash
npm install
npx playwright install chromium
```

## Running

| Command | What it does |
|---------|--------------|
| `npm test` | Runs the tests headless |
| `npm run test:headed` | Runs in a visible browser, slowed down so it can be followed |
| `npm run test:ui` | Opens Playwright UI mode with a step-by-step timeline |
| `npm run report` | Opens the HTML report of the last run, including traces |

The tests run against the live public site, so an internet connection is needed.
