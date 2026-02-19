# PlayOnJoy — User Frontend

The public-facing Next.js frontend for the **PlayOnJoy** platform — a Web3-enabled gaming and NFT marketplace.

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | Next.js 15.5.7 (App Router) |
| Language | TypeScript |
| UI | MUI (Material UI) v5 + Emotion |
| 3D / Animation | Three.js, React Three Fiber, Drei, GSAP |
| Carousel | Swiper |
| Web3 | Reown AppKit, Ethers.js v5, Solana Kit |
| HTTP | Axios |
| Deployment | PM2 (standalone) |

---

## Prerequisites

- **Node.js** >= 18.18.0
- **npm** (comes with Node)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd user-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_HELIO_API_KEY` | Helio payment gateway API key |

**Local development example:**

```env
NEXT_PUBLIC_API_URL=http://localhost:8052/api
NEXT_PUBLIC_HELIO_API_KEY=your_helio_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

The app will be available at [http://localhost:4040](http://localhost:4040).

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server on port 4040 |
| `npm run build` | Build for production |
| `npm run start` | Start production server on port 4040 |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
src/
├── app/            # Next.js App Router pages & layouts
│   ├── blog/
│   ├── nftcheckout/
│   ├── pre-book/
│   ├── privacy-data-policy/
│   ├── shop/
│   ├── terms-conditions/
│   └── user/
├── assets/         # Static assets (images, fonts, etc.)
├── component/      # Shared UI components
├── components/     # Feature-specific components
├── config/         # App configuration (Web3, etc.)
├── contracts/      # Smart contract ABIs / addresses
├── hooks/          # Custom React hooks
└── utils/          # Helper utilities
```

---

## Deployment

The project uses **PM2** with Next.js standalone output.

### Build

```bash
npm run build
```

### Copy static assets (required for standalone)

```bash
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

### Start with PM2

```bash
pm2 start ecosystem.config.js
```

The app runs on **port 4040**.

### PM2 process name

```
user-frontend
```

---

## Environment

| Environment | API URL |
|---|---|
| Production | `https://joy-admin.appworkdemo.com` |
| Local | `http://localhost:8052/api` |
