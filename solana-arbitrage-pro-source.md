# Solana Arbitrage Pro — Full Source

Next.js 16 (App Router) + Tailwind CSS v4 + lucide-react + recharts. Each file starts with a `// FILE:` header.

```tsx
// ============================================================
// FILE: package.json
// ============================================================
{
  "name": "my-project",
  "version": "0.1.0",
  "private": true,
  "packageManager": "pnpm@12.3.4",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@base-ui/react": "^1.5.0",
    "@vercel/analytics": "1.6.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^1.16.0",
    "next": "16.4.3",
    "react": "^19",
    "react-dom": "^19",
    "recharts": "^3.10.1",
    "shadcn": "^4.11.0",
    "tailwind-merge": "^3.3.1",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@types/node": "^24",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8.5",
    "tailwindcss": "^4.3.3",
    "typescript": "5.7.3"
  }
}

// ============================================================
// FILE: app/layout.tsx
// ============================================================
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Solana Arbitrage Pro · Flash Loan Dashboard',
  description:
    'Autonomous Solana flash loan arbitrage dashboard with Kamino Lend, Jito MEV protection and live DEX spread monitoring across Raydium, Orca and Meteora.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#090D16',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} bg-[#090D16]`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

// ============================================================
// FILE: app/page.tsx
// ============================================================
import { Dashboard } from '@/components/arb/dashboard'

export default function Page() {
  return <Dashboard />
}

// ============================================================
// FILE: app/globals.css
// ============================================================
@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: var(--font-geist), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  color-scheme: light;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  color-scheme: dark;
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    color-scheme: dark;
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.205 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0);
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.556 0 0);
    --chart-1: oklch(0.87 0 0);
    --chart-2: oklch(0.556 0 0);
    --chart-3: oklch(0.439 0 0);
    --chart-4: oklch(0.371 0 0);
    --chart-5: oklch(0.269 0 0);
    --sidebar: oklch(0.205 0 0);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.269 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.556 0 0);
  }
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

// ============================================================
// FILE: lib/arbitrage-engine.ts
// ============================================================
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type DexId = 'raydium' | 'orca' | 'meteora'

export type DexQuote = {
  id: DexId
  name: string
  short: string
  pool: string
  price: number
}

export type LogStep = 'SYS' | 'SCAN' | 'TRIGGER' | 'BORROW' | 'SWAP_LOW' | 'SWAP_HIGH' | 'REPAY' | 'CREDIT'

export type LogLine = {
  id: number
  time: string
  step: LogStep
  message: string
  highlight?: boolean
}

export type ProfitPoint = {
  time: string
  profit: number
}

export type Network = 'mainnet' | 'devnet'

export type EngineStatus = {
  network: Network
  latencyMs: number
  slot: number
  scanCount: number
  opportunities: number
  lastScanAt: number
  executing: boolean
}

export const FLASH_FEE_RATE = 0.0005
export const JITO_TIP_SOL = 0.0001
export const GAS_PER_TX_SOL = 0.000025
export const SOL_RESERVE_TARGET = 5
export const SCAN_INTERVAL_MS = 3000
const STEP_INTERVAL_MS = 550
const MIN_SPREAD = 0.0012
const MAX_LOGS = 120
const MAX_POINTS = 40
const INITIAL_PROFIT = 12847.32
const INITIAL_SOL = 4.8213
const INITIAL_SLOT: Record<Network, number> = { mainnet: 298_441_207, devnet: 341_902_115 }

const DEXES: Omit<DexQuote, 'price'>[] = [
  { id: 'raydium', name: 'Raydium', short: 'Raydium', pool: 'CLMM · SOL/USDC' },
  { id: 'orca', name: 'Orca Whirlpool', short: 'Orca', pool: 'Whirlpool · 0.04%' },
  { id: 'meteora', name: 'Meteora DLMM', short: 'Meteora', pool: 'DLMM · bin step 4' },
]

const PAIRS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
]

const INITIAL_PRICES = [156.42, 156.18, 156.61]

const initialQuotes: DexQuote[] = DEXES.map((dex, i) => ({ ...dex, price: INITIAL_PRICES[i] }))

const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

export function randomBase58(length: number) {
  let out = ''
  for (let i = 0; i < length; i++) out += BASE58[Math.floor(Math.random() * BASE58.length)]
  return out
}

export function formatUsd(value: number) {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function shortAddress(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`
}

function clockTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour12: false })
}

function signedPct(value: number) {
  return `${value >= 0 ? '+' : ''}${(value * 100).toFixed(3)}%`
}

function seedHistory(now: number): ProfitPoint[] {
  const points: ProfitPoint[] = []
  let value = INITIAL_PROFIT
  for (let i = 0; i < MAX_POINTS; i++) {
    points.unshift({ time: clockTime(new Date(now - i * 5000)), profit: Number(value.toFixed(2)) })
    value -= 18 + Math.random() * 62
  }
  return points
}

type PendingTx = {
  step: number
  borrow: number
  fee: number
  sol: number
  buy: DexQuote
  sell: DexQuote
  profit: number
}

export function useArbitrageEngine(walletAddress: string | null) {
  const [quotes, setQuotes] = useState<DexQuote[]>(initialQuotes)
  const [balance, setBalance] = useState(INITIAL_PROFIT)
  const [solBalance, setSolBalance] = useState(INITIAL_SOL)
  const [history, setHistory] = useState<ProfitPoint[]>([])
  const [logs, setLogs] = useState<LogLine[]>([])
  const [txCount, setTxCount] = useState(18432)
  const [lastProfit, setLastProfit] = useState<number | null>(null)
  const [status, setStatus] = useState<EngineStatus>({
    network: 'mainnet',
    latencyMs: 38,
    slot: INITIAL_SLOT.mainnet,
    scanCount: 0,
    opportunities: 0,
    lastScanAt: 0,
    executing: false,
  })

  const quotesRef = useRef(initialQuotes)
  const offsetsRef = useRef([0.0012, -0.0003, 0.0018])
  const baseRef = useRef(156.2)
  const txRef = useRef<PendingTx | null>(null)
  const logIdRef = useRef(0)
  const totalRef = useRef(INITIAL_PROFIT)
  const scanRef = useRef(0)
  const walletRef = useRef(walletAddress)
  const networkRef = useRef<Network>('mainnet')

  useEffect(() => {
    walletRef.current = walletAddress
  }, [walletAddress])

  const pushLogs = useCallback((lines: Omit<LogLine, 'id' | 'time'>[]) => {
    const time = clockTime(new Date())
    const stamped = lines.map((line) => ({ ...line, id: logIdRef.current++, time }))
    setLogs((prev) => {
      const next = [...prev, ...stamped]
      return next.length > MAX_LOGS ? next.slice(next.length - MAX_LOGS) : next
    })
  }, [])

  const setNetwork = useCallback(
    (network: Network) => {
      if (networkRef.current === network) return
      networkRef.current = network
      setStatus((s) => ({ ...s, network, slot: INITIAL_SLOT[network], latencyMs: network === 'mainnet' ? 38 : 64 }))
      pushLogs([
        { step: 'SYS', message: `Switching RPC → Helius WebSocket (${network}) · resubscribing to 3 pool accounts` },
        { step: 'SYS', message: `accountSubscribe ok · Raydium, Orca, Meteora streams live on ${network}` },
      ])
    },
    [pushLogs],
  )

  useEffect(() => {
    setHistory(seedHistory(Date.now()))
    pushLogs([
      { step: 'SYS', message: 'Connecting to Helius WebSocket · wss://mainnet.helius-rpc.com' },
      { step: 'SYS', message: 'accountSubscribe ok · tracking Raydium CLMM, Orca Whirlpool, Meteora DLMM' },
      { step: 'SYS', message: `Scanner loop armed · interval ${SCAN_INTERVAL_MS / 1000}s · min spread ${(MIN_SPREAD * 100).toFixed(2)}%` },
    ])

    const priceTimer = setInterval(() => {
      baseRef.current *= 1 + (Math.random() - 0.5) * 0.0016
      offsetsRef.current = offsetsRef.current.map((offset) => {
        const target = (Math.random() - 0.5) * 0.006
        return offset + (target - offset) * 0.45
      })
      const next = DEXES.map((dex, i) => ({
        ...dex,
        price: Number((baseRef.current * (1 + offsetsRef.current[i])).toFixed(3)),
      }))
      quotesRef.current = next
      setQuotes(next)
    }, 1500)

    const heartbeatTimer = setInterval(() => {
      setStatus((s) => ({
        ...s,
        slot: s.slot + 2 + Math.floor(Math.random() * 2),
        latencyMs: Math.max(18, Math.round((s.network === 'mainnet' ? 36 : 62) + (Math.random() - 0.5) * 22)),
      }))
    }, 800)

    const scanTimer = setInterval(() => {
      const scanId = ++scanRef.current
      const q = quotesRef.current
      setStatus((s) => ({ ...s, scanCount: scanId, lastScanAt: Date.now() }))

      if (txRef.current) {
        pushLogs([{ step: 'SCAN', message: `#${scanId} executor busy · queued pool snapshot` }])
        return
      }

      const lines: Omit<LogLine, 'id' | 'time'>[] = PAIRS.map(([a, b]) => ({
        step: 'SCAN',
        message: `#${scanId} ${q[a].short} vs ${q[b].short} spread: ${signedPct((q[b].price - q[a].price) / q[a].price)}`,
      }))

      const buy = q.reduce((x, y) => (y.price < x.price ? y : x))
      const sell = q.reduce((x, y) => (y.price > x.price ? y : x))
      const spread = (sell.price - buy.price) / buy.price
      const borrow = Math.round((20000 + Math.random() * 60000) / 100) * 100
      const fee = borrow * FLASH_FEE_RATE
      const sol = borrow / buy.price
      const profit = sol * sell.price - borrow - fee - (JITO_TIP_SOL + GAS_PER_TX_SOL) * sell.price

      if (spread < MIN_SPREAD || profit <= 0) {
        lines.push({
          step: 'SCAN',
          message: `#${scanId} best ${signedPct(spread)} below ${(MIN_SPREAD * 100).toFixed(2)}% threshold · no-op`,
        })
        pushLogs(lines)
        return
      }

      lines.push({
        step: 'TRIGGER',
        highlight: true,
        message: `Opportunity ${buy.short} → ${sell.short} ${signedPct(spread)} · est. +$${formatUsd(profit)} · building atomic tx`,
      })
      pushLogs(lines)
      txRef.current = { step: 0, borrow, fee, sol, buy, sell, profit }
      setStatus((s) => ({ ...s, opportunities: s.opportunities + 1, executing: true }))
    }, SCAN_INTERVAL_MS)

    const execTimer = setInterval(() => {
      const tx = txRef.current
      if (!tx) return

      switch (tx.step) {
        case 0:
          pushLogs([{ step: 'BORROW', message: `Flash loan ${formatUsd(tx.borrow)} USDC from Kamino Lend · fee ${formatUsd(tx.fee)} USDC` }])
          break
        case 1:
          pushLogs([
            {
              step: 'SWAP_LOW',
              message: `Swap ${formatUsd(tx.borrow)} USDC → ${tx.sol.toFixed(3)} SOL on ${tx.buy.name} @ $${tx.buy.price.toFixed(3)}`,
            },
          ])
          break
        case 2:
          pushLogs([
            {
              step: 'SWAP_HIGH',
              message: `Swap ${tx.sol.toFixed(3)} SOL → ${formatUsd(tx.sol * tx.sell.price)} USDC on ${tx.sell.name} @ $${tx.sell.price.toFixed(3)}`,
            },
          ])
          break
        case 3:
          pushLogs([
            {
              step: 'REPAY',
              message: `Repay ${formatUsd(tx.borrow + tx.fee)} USDC to Kamino · Jito bundle landed (tip ${JITO_TIP_SOL} SOL)`,
            },
          ])
          break
        case 4: {
          const sig = randomBase58(88)
          const dest = walletRef.current ? `wallet ${shortAddress(walletRef.current)}` : 'profit vault (connect wallet to route)'
          pushLogs([
            {
              step: 'CREDIT',
              highlight: true,
              message: `+$${formatUsd(tx.profit)} net profit auto-credited to ${dest} · sig ${sig.slice(0, 6)}…${sig.slice(-6)}`,
            },
          ])
          totalRef.current += tx.profit
          const point = { time: clockTime(new Date()), profit: Number(totalRef.current.toFixed(2)) }
          setHistory((prev) => [...prev, point].slice(-MAX_POINTS))
          setBalance((b) => b + tx.profit)
          setSolBalance((s) => s - JITO_TIP_SOL - GAS_PER_TX_SOL)
          setTxCount((c) => c + 1)
          setLastProfit(tx.profit)
          setStatus((s) => ({ ...s, executing: false }))
          txRef.current = null
          return
        }
      }
      tx.step += 1
    }, STEP_INTERVAL_MS)

    return () => {
      clearInterval(priceTimer)
      clearInterval(heartbeatTimer)
      clearInterval(scanTimer)
      clearInterval(execTimer)
    }
  }, [pushLogs])

  const withdraw = useCallback((amount: number) => {
    setBalance((b) => Math.max(0, b - amount))
  }, [])

  return { quotes, balance, solBalance, history, logs, txCount, lastProfit, status, setNetwork, withdraw }
}

// ============================================================
// FILE: components/arb/modal.tsx
// ============================================================
'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
}

export function Modal({ open, onClose, title, description, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-cyan-400/20 bg-[#0C1220] p-0 text-slate-100 shadow-[0_0_60px_-15px_rgba(34,211,238,0.35)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-lg font-semibold text-white">
              {title}
            </h2>
            {description && (
              <p id={descId} className="mt-1 text-sm text-slate-400">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
            aria-label="Close dialog"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  )
}

// ============================================================
// FILE: components/arb/wallet-modal.tsx
// ============================================================
'use client'

import { useState } from 'react'
import { ChevronRight, Loader2, LogOut } from 'lucide-react'
import { Modal } from './modal'
import { randomBase58 } from '@/lib/arbitrage-engine'

export type WalletId = 'trust' | 'metamask' | 'tokenpocket'

export type ConnectedWallet = {
  id: WalletId
  name: string
  address: string
}

const WALLETS: { id: WalletId; name: string; tagline: string; initials: string; tile: string }[] = [
  { id: 'trust', name: 'Trust Wallet', tagline: 'Mobile & browser extension', initials: 'TW', tile: 'bg-[#0500FF] text-white' },
  { id: 'metamask', name: 'MetaMask', tagline: 'Via Solana Snap', initials: 'MM', tile: 'bg-[#F6851B] text-white' },
  { id: 'tokenpocket', name: 'TokenPocket', tagline: 'Multi-chain wallet', initials: 'TP', tile: 'bg-[#2980FE] text-white' },
]

type WalletModalProps = {
  open: boolean
  onClose: () => void
  wallet: ConnectedWallet | null
  onConnect: (wallet: ConnectedWallet) => void
  onDisconnect: () => void
}

export function shortAddress(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`
}

export function WalletModal({ open, onClose, wallet, onConnect, onDisconnect }: WalletModalProps) {
  const [connecting, setConnecting] = useState<WalletId | null>(null)

  function connect(id: WalletId, name: string) {
    setConnecting(id)
    setTimeout(() => {
      onConnect({ id, name, address: randomBase58(44) })
      setConnecting(null)
      onClose()
    }, 1200)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={wallet ? 'Wallet connected' : 'Connect a wallet'}
      description={wallet ? 'Profits are withdrawn to this address.' : 'Choose a wallet to receive withdrawn profits.'}
    >
      {wallet ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">{wallet.name}</p>
            <p className="mt-1 break-all font-mono text-sm text-emerald-300">{wallet.address}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onDisconnect()
              onClose()
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/30 px-4 py-2.5 text-sm font-medium text-red-300 transition-colors hover:bg-red-400/10"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Disconnect
          </button>
        </div>
      ) : (
        <ul className="space-y-2.5">
          {WALLETS.map((w) => (
            <li key={w.id}>
              <button
                type="button"
                disabled={connecting !== null}
                onClick={() => connect(w.id, w.name)}
                className="group flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 text-left transition-all hover:border-cyan-400/40 hover:bg-cyan-400/5 focus-visible:outline-2 focus-visible:outline-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold ${w.tile}`}
                  aria-hidden="true"
                >
                  {w.initials}
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-white">{w.name}</span>
                  <span className="block text-xs text-slate-400">{w.tagline}</span>
                </span>
                {connecting === w.id ? (
                  <Loader2 className="size-5 animate-spin text-cyan-400" aria-label="Connecting" />
                ) : (
                  <ChevronRight
                    className="size-5 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-400"
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  )
}

// ============================================================
// FILE: components/arb/withdraw-modal.tsx
// ============================================================
'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Wallet } from 'lucide-react'
import { Modal } from './modal'
import { shortAddress, type ConnectedWallet } from './wallet-modal'
import { formatUsd, randomBase58 } from '@/lib/arbitrage-engine'

type WithdrawModalProps = {
  open: boolean
  onClose: () => void
  balance: number
  wallet: ConnectedWallet | null
  onConnectWallet: () => void
  onWithdraw: (amount: number) => void
}

type Status = { kind: 'idle' } | { kind: 'processing' } | { kind: 'success'; amount: number; signature: string }

export function WithdrawModal({ open, onClose, balance, wallet, onConnectWallet, onWithdraw }: WithdrawModalProps) {
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const value = Number(amount)
  const error =
    amount === ''
      ? null
      : !Number.isFinite(value) || value <= 0
        ? 'Enter an amount greater than 0'
        : value > balance
          ? 'Amount exceeds available balance'
          : null
  const canSubmit = wallet && amount !== '' && !error && status.kind === 'idle'

  function close() {
    onClose()
    setAmount('')
    setStatus({ kind: 'idle' })
  }

  function confirm() {
    if (!canSubmit) return
    setStatus({ kind: 'processing' })
    setTimeout(() => {
      onWithdraw(value)
      setStatus({ kind: 'success', amount: value, signature: randomBase58(88) })
    }, 1600)
  }

  return (
    <Modal open={open} onClose={close} title="Withdraw Profits" description="Transfer accumulated USDC profit to your wallet.">
      {status.kind === 'success' ? (
        <div className="flex flex-col items-center py-4 text-center" role="status">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-400/15 shadow-[0_0_40px_-8px_rgba(52,211,153,0.7)]">
            <CheckCircle2 className="size-9 text-emerald-400" aria-hidden="true" />
          </div>
          <p className="mt-4 text-lg font-semibold text-white">Withdrawal confirmed</p>
          <p className="mt-1 font-mono text-2xl font-bold text-emerald-300">${formatUsd(status.amount)}</p>
          <p className="mt-2 text-sm text-slate-400">
            Sent to {wallet ? shortAddress(wallet.address) : 'your wallet'}
          </p>
          <p className="mt-3 w-full truncate rounded-lg bg-white/5 px-3 py-2 font-mono text-xs text-slate-500">
            sig {status.signature}
          </p>
          <button
            type="button"
            onClick={close}
            className="mt-5 w-full rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            Done
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            confirm()
          }}
          className="space-y-4"
        >
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">Available balance</p>
            <p className="mt-1 font-mono text-3xl font-bold text-white tabular-nums">${formatUsd(balance)}</p>
          </div>

          <div>
            <label htmlFor="withdraw-amount" className="text-sm font-medium text-slate-300">
              Amount (USDC)
            </label>
            <div className="mt-1.5 flex items-center rounded-xl border border-white/10 bg-[#090D16] focus-within:border-cyan-400/50">
              <span className="pl-3 font-mono text-slate-500">$</span>
              <input
                id="withdraw-amount"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'withdraw-error' : undefined}
                className="w-full bg-transparent px-2 py-3 font-mono text-white outline-none placeholder:text-slate-600 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => setAmount((Math.floor(balance * 100) / 100).toFixed(2))}
                className="mr-2 rounded-lg bg-cyan-400/10 px-2.5 py-1 text-xs font-semibold text-cyan-300 hover:bg-cyan-400/20"
              >
                MAX
              </button>
            </div>
            {error && (
              <p id="withdraw-error" className="mt-1.5 text-xs text-red-400">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 text-sm">
            <span className="text-slate-400">Destination</span>
            {wallet ? (
              <span className="font-mono text-cyan-300">{shortAddress(wallet.address)}</span>
            ) : (
              <button
                type="button"
                onClick={onConnectWallet}
                className="flex items-center gap-1.5 font-medium text-cyan-300 hover:text-cyan-200"
              >
                <Wallet className="size-4" aria-hidden="true" />
                Connect wallet
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-semibold text-[#090D16] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status.kind === 'processing' ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Processing…
              </>
            ) : wallet ? (
              'Confirm Withdrawal'
            ) : (
              'Connect a wallet to withdraw'
            )}
          </button>
        </form>
      )}
    </Modal>
  )
}

// ============================================================
// FILE: components/arb/header.tsx
// ============================================================
import { Bot, Wallet, Zap } from 'lucide-react'
import { shortAddress, type ConnectedWallet } from './wallet-modal'

type HeaderProps = {
  wallet: ConnectedWallet | null
  onWalletClick: () => void
}

export function Header({ wallet, onWalletClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#090D16]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 to-emerald-400 shadow-[0_0_24px_-4px_rgba(52,211,153,0.6)]">
            <Zap className="size-5 text-[#090D16]" aria-hidden="true" />
          </div>
          <div>
            <h1 className="bg-linear-to-r from-cyan-300 via-cyan-400 to-emerald-400 bg-clip-text font-mono text-lg font-bold tracking-wider text-transparent sm:text-xl">
              SOLANA ARBITRAGE PRO
            </h1>
            <p className="text-xs text-slate-500">Atomic flash loan executor · mainnet-beta</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div
            className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300"
            role="status"
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <Bot className="size-4" aria-hidden="true" />
            <span>Autonomous Bot: 24/7 Live</span>
          </div>

          <button
            type="button"
            onClick={onWalletClick}
            className={
              wallet
                ? 'flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 font-mono text-sm text-cyan-300 transition-colors hover:bg-cyan-400/15 focus-visible:outline-2 focus-visible:outline-cyan-400'
                : 'flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-[#090D16] shadow-[0_0_24px_-6px_rgba(34,211,238,0.7)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400'
            }
          >
            <Wallet className="size-4" aria-hidden="true" />
            {wallet ? shortAddress(wallet.address) : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </header>
  )
}

// ============================================================
// FILE: components/arb/metric-cards.tsx
// ============================================================
import type { ReactNode } from 'react'
import { ArrowUpRight, Banknote, DollarSign, Fuel, Landmark, ShieldCheck } from 'lucide-react'
import {
  FLASH_FEE_RATE,
  GAS_PER_TX_SOL,
  JITO_TIP_SOL,
  SOL_RESERVE_TARGET,
  formatUsd,
} from '@/lib/arbitrage-engine'

type MetricCardsProps = {
  balance: number
  solBalance: number
  txCount: number
  lastProfit: number | null
  onWithdraw: () => void
}

function Card({ children, accent }: { children: ReactNode; accent: 'cyan' | 'emerald' }) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border bg-[#0D1322] p-5 ${
        accent === 'emerald' ? 'border-emerald-400/15' : 'border-cyan-400/15'
      }`}
    >
      <div
        className={`pointer-events-none absolute -top-16 -right-16 size-40 rounded-full blur-3xl ${
          accent === 'emerald' ? 'bg-emerald-400/10' : 'bg-cyan-400/10'
        }`}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}

function CardLabel({ icon, label, accent }: { icon: ReactNode; label: string; accent: 'cyan' | 'emerald' }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex size-8 items-center justify-center rounded-lg ${
          accent === 'emerald' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-cyan-400/10 text-cyan-400'
        }`}
      >
        {icon}
      </span>
      <h2 className="text-sm font-medium text-slate-400">{label}</h2>
    </div>
  )
}

export function MetricCards({ balance, solBalance, txCount, lastProfit, onWithdraw }: MetricCardsProps) {
  const reservePct = Math.min(100, (solBalance / SOL_RESERVE_TARGET) * 100)
  const txRemaining = Math.floor(solBalance / (JITO_TIP_SOL + GAS_PER_TX_SOL))
  const healthy = solBalance > 1

  return (
    <section aria-label="Key metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card accent="emerald">
        <CardLabel icon={<DollarSign className="size-4" aria-hidden="true" />} label="Accumulated Profit" accent="emerald" />
        <p className="mt-4 font-mono text-3xl font-bold text-white tabular-nums">${formatUsd(balance)}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
          {lastProfit ? `+$${formatUsd(lastProfit)} last tx` : 'Awaiting next bundle'}
        </p>
        <button
          type="button"
          onClick={onWithdraw}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-400 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-[#090D16] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        >
          <Banknote className="size-4" aria-hidden="true" />
          Withdraw Profits
        </button>
      </Card>

      <Card accent="cyan">
        <CardLabel icon={<Fuel className="size-4" aria-hidden="true" />} label="SOL Gas Balance" accent="cyan" />
        <p className="mt-4 font-mono text-3xl font-bold text-white tabular-nums">
          {solBalance.toFixed(4)} <span className="text-lg text-slate-400">SOL</span>
        </p>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs">
            <span className={healthy ? 'text-emerald-400' : 'text-amber-400'}>
              {healthy ? 'Reserve healthy' : 'Reserve low'}
            </span>
            <span className="text-slate-500">target {SOL_RESERVE_TARGET} SOL</span>
          </div>
          <div
            className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5"
            role="progressbar"
            aria-label="SOL reserve level"
            aria-valuenow={Math.round(reservePct)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 transition-all"
              style={{ width: `${reservePct}%` }}
            />
          </div>
        </div>
        <p className="mt-auto pt-3 text-xs text-slate-500">~{txRemaining.toLocaleString('en-US')} bundles of runway</p>
      </Card>

      <Card accent="cyan">
        <CardLabel icon={<Landmark className="size-4" aria-hidden="true" />} label="Flash Loan Provider" accent="cyan" />
        <p className="mt-4 text-2xl font-bold text-white">Kamino Lend</p>
        <dl className="mt-3 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500">Flash fee</dt>
            <dd className="font-mono text-cyan-300">{(FLASH_FEE_RATE * 100).toFixed(2)}%</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">USDC liquidity</dt>
            <dd className="font-mono text-slate-200">$48.2M</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Loan type</dt>
            <dd className="text-slate-200">Atomic · same tx</dd>
          </div>
        </dl>
      </Card>

      <Card accent="emerald">
        <CardLabel icon={<ShieldCheck className="size-4" aria-hidden="true" />} label="MEV Protection" accent="emerald" />
        <div className="mt-4 flex items-center gap-2">
          <p className="text-2xl font-bold text-white">Jito Bundles</p>
          <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 text-xs font-semibold text-emerald-300">ENABLED</span>
        </div>
        <dl className="mt-3 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500">Tip per bundle</dt>
            <dd className="font-mono text-emerald-300">{JITO_TIP_SOL} SOL</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Bundles landed</dt>
            <dd className="font-mono text-slate-200 tabular-nums">{txCount.toLocaleString('en-US')}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Front-run attempts</dt>
            <dd className="font-mono text-slate-200">0 succeeded</dd>
          </div>
        </dl>
      </Card>
    </section>
  )
}

// ============================================================
// FILE: components/arb/engine-status.tsx
// ============================================================
'use client'

import { useEffect, useState } from 'react'
import { Activity, Radio, Server, Timer } from 'lucide-react'
import { SCAN_INTERVAL_MS, type DexQuote, type EngineStatus, type Network } from '@/lib/arbitrage-engine'

type EngineStatusCardProps = {
  status: EngineStatus
  quotes: DexQuote[]
  onNetworkChange: (network: Network) => void
}

const NETWORKS: Network[] = ['mainnet', 'devnet']

function useScanCountdown(lastScanAt: number) {
  const [now, setNow] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 100)
    return () => clearInterval(timer)
  }, [])
  if (!lastScanAt || !now) return { remaining: SCAN_INTERVAL_MS, progress: 0 }
  const elapsed = Math.min(SCAN_INTERVAL_MS, Math.max(0, now - lastScanAt))
  return { remaining: SCAN_INTERVAL_MS - elapsed, progress: elapsed / SCAN_INTERVAL_MS }
}

function PanelTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
      {icon}
      {label}
    </div>
  )
}

export function EngineStatusCard({ status, quotes, onNetworkChange }: EngineStatusCardProps) {
  const { remaining, progress } = useScanCountdown(status.lastScanAt)

  return (
    <section
      aria-labelledby="engine-status-title"
      className="relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-[#0D1322] p-5"
    >
      <div
        className="pointer-events-none absolute -top-20 left-1/3 size-56 rounded-full bg-cyan-400/5 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300">
            <Server className="size-4" aria-hidden="true" />
          </span>
          <div>
            <h2 id="engine-status-title" className="font-semibold text-slate-100">
              Backend Engine Status
            </h2>
            <p className="text-xs text-slate-500">Scanner and executor heartbeat</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] ${
            status.executing
              ? 'border-amber-300/30 bg-amber-300/10 text-amber-200'
              : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
          }`}
        >
          <span
            className={`size-1.5 animate-pulse rounded-full ${status.executing ? 'bg-amber-300' : 'bg-emerald-400'}`}
            aria-hidden="true"
          />
          {status.executing ? 'EXECUTING' : 'SCANNING'}
        </span>
      </div>

      <div className="relative mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/5 bg-[#090D16] p-4">
          <PanelTitle icon={<Radio className="size-3.5 text-cyan-300" aria-hidden="true" />} label="Connected RPC" />
          <p className="mt-2 font-semibold text-slate-100">Helius WebSocket</p>
          <div
            role="radiogroup"
            aria-label="RPC network"
            className="mt-3 inline-flex rounded-lg border border-white/10 bg-white/5 p-0.5"
          >
            {NETWORKS.map((network) => {
              const active = status.network === network
              return (
                <button
                  key={network}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onNetworkChange(network)}
                  className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                    active ? 'bg-cyan-400/15 text-cyan-200' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {network}
                </button>
              )
            })}
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-2 font-mono text-xs">
            <div>
              <dt className="text-slate-500">Latency</dt>
              <dd className="text-emerald-300">{status.latencyMs} ms</dd>
            </div>
            <div>
              <dt className="text-slate-500">Slot</dt>
              <dd className="tabular-nums text-slate-200">{status.slot.toLocaleString('en-US')}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#090D16] p-4">
          <PanelTitle
            icon={<Activity className="size-3.5 text-emerald-300" aria-hidden="true" />}
            label="Active Pools Tracked"
          />
          <ul className="mt-3 space-y-2">
            {quotes.map((quote) => (
              <li key={quote.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="relative flex size-2 shrink-0" aria-hidden="true">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="truncate text-slate-200">{quote.short}</span>
                </span>
                <span className="font-mono text-xs tabular-nums text-slate-400">${quote.price.toFixed(3)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-500">3 pools · accountSubscribe streams</p>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#090D16] p-4">
          <PanelTitle icon={<Timer className="size-3.5 text-cyan-300" aria-hidden="true" />} label="Scanner Loop" />
          <p className="mt-2 font-semibold text-slate-100">
            Every {SCAN_INTERVAL_MS / 1000} seconds{' '}
            <span className="text-xs font-normal text-emerald-300">· Autonomous</span>
          </p>
          <div className="mt-3 flex items-center justify-between font-mono text-xs text-slate-500">
            <span>next scan</span>
            <span className="tabular-nums text-cyan-300">{(remaining / 1000).toFixed(1)}s</span>
          </div>
          <div
            className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5"
            role="progressbar"
            aria-label="Time until next scan"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-2 font-mono text-xs">
            <div>
              <dt className="text-slate-500">Scans</dt>
              <dd className="tabular-nums text-slate-200">{status.scanCount.toLocaleString('en-US')}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Triggers</dt>
              <dd className="tabular-nums text-emerald-300">{status.opportunities}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// FILE: components/arb/profit-chart.tsx
// ============================================================
'use client'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { formatUsd, type ProfitPoint } from '@/lib/arbitrage-engine'

export function ProfitChart({ data }: { data: ProfitPoint[] }) {
  const first = data[0]?.profit ?? 0
  const last = data[data.length - 1]?.profit ?? 0
  const gain = last - first

  return (
    <section
      aria-labelledby="profit-chart-title"
      className="flex flex-col rounded-2xl border border-white/5 bg-[#0D1322] p-5 lg:col-span-2"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="profit-chart-title" className="flex items-center gap-2 font-semibold text-white">
            <TrendingUp className="size-4 text-emerald-400" aria-hidden="true" />
            Real-time Profit Growth
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">Cumulative net profit · last {data.length} samples</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl font-bold text-white tabular-nums">${formatUsd(last)}</p>
          <p className="font-mono text-xs text-emerald-400 tabular-nums">+${formatUsd(gain)} window</p>
        </div>
      </div>

      <div className="mt-4 h-64 sm:h-72">
        {data.length === 0 ? (
          <div className="size-full animate-pulse rounded-xl bg-white/[0.03]" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profitStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.08)" vertical={false} />
              <XAxis
                dataKey="time"
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                minTickGap={40}
              />
              <YAxis
                domain={['dataMin - 40', 'dataMax + 40']}
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={64}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(2)}k`}
              />
              <Tooltip
                cursor={{ stroke: 'rgba(34,211,238,0.3)' }}
                contentStyle={{
                  background: '#0C1220',
                  border: '1px solid rgba(34,211,238,0.25)',
                  borderRadius: 12,
                  fontSize: 12,
                }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#34d399' }}
                formatter={(value) => [`$${formatUsd(Number(value))}`, 'Profit']}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="url(#profitStroke)"
                strokeWidth={2.5}
                fill="url(#profitFill)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}

// ============================================================
// FILE: components/arb/spread-monitor.tsx
// ============================================================
import { ArrowRight, Radar } from 'lucide-react'
import type { DexQuote } from '@/lib/arbitrage-engine'

export function SpreadMonitor({ quotes }: { quotes: DexQuote[] }) {
  const low = quotes.reduce((a, b) => (b.price < a.price ? b : a))
  const high = quotes.reduce((a, b) => (b.price > a.price ? b : a))
  const maxSpread = ((high.price - low.price) / low.price) * 100

  return (
    <section aria-labelledby="spread-title" className="flex flex-col rounded-2xl border border-white/5 bg-[#0D1322] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 id="spread-title" className="flex items-center gap-2 font-semibold text-white">
            <Radar className="size-4 text-cyan-400" aria-hidden="true" />
            DEX Spread Monitor
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">SOL/USDC · spread vs. cheapest pool</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-300">
          <span className="size-1.5 animate-pulse rounded-full bg-cyan-400" aria-hidden="true" />
          LIVE
        </span>
      </div>

      <ul className="mt-4 space-y-3">
        {quotes.map((q) => {
          const spread = ((q.price - low.price) / low.price) * 100
          const isLow = q.id === low.id
          const isHigh = q.id === high.id
          const width = maxSpread > 0 ? Math.max(4, (spread / maxSpread) * 100) : 4
          return (
            <li
              key={q.id}
              className={`rounded-xl border p-3.5 transition-colors ${
                isLow ? 'border-emerald-400/30 bg-emerald-400/5' : isHigh ? 'border-cyan-400/30 bg-cyan-400/5' : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-medium text-white">
                    {q.name}
                    {isLow && <span className="rounded bg-emerald-400/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">BUY</span>}
                    {isHigh && <span className="rounded bg-cyan-400/20 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300">SELL</span>}
                  </p>
                  <p className="truncate text-xs text-slate-500">{q.pool}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-semibold text-white tabular-nums">${q.price.toFixed(3)}</p>
                  <p className={`font-mono text-xs tabular-nums ${spread > 0 ? 'text-cyan-300' : 'text-slate-500'}`}>
                    +{spread.toFixed(3)}%
                  </p>
                </div>
              </div>
              <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/5" aria-hidden="true">
                <div
                  className="h-full rounded-full bg-linear-to-r from-emerald-400 to-cyan-400 transition-all duration-700"
                  style={{ width: `${width}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-auto pt-4">
        <div className="rounded-xl border border-white/5 bg-[#090D16] p-3.5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Best route</p>
          <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm text-white">
            <span className="text-emerald-300">{low.name}</span>
            <ArrowRight className="size-3.5 text-slate-500" aria-label="to" />
            <span className="text-cyan-300">{high.name}</span>
          </p>
          <p className="mt-1 font-mono text-lg font-bold text-white tabular-nums">{maxSpread.toFixed(3)}% gross spread</p>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// FILE: components/arb/execution-terminal.tsx
// ============================================================
'use client'

import { useEffect, useRef } from 'react'
import { Terminal } from 'lucide-react'
import type { LogLine, LogStep, Network } from '@/lib/arbitrage-engine'

const STEP_STYLE: Record<LogStep, { label: string; className: string }> = {
  SYS: { label: 'SYS', className: 'text-cyan-500' },
  SCAN: { label: 'SCAN', className: 'text-slate-500' },
  TRIGGER: { label: 'TRIGGER', className: 'text-emerald-400' },
  BORROW: { label: 'BORROW', className: 'text-amber-300' },
  SWAP_LOW: { label: 'SWAP_LOW', className: 'text-cyan-300' },
  SWAP_HIGH: { label: 'SWAP_HIGH', className: 'text-sky-300' },
  REPAY: { label: 'REPAY', className: 'text-violet-300' },
  CREDIT: { label: 'CREDIT', className: 'text-emerald-300' },
}

const PIPELINE: LogStep[] = ['BORROW', 'SWAP_LOW', 'SWAP_HIGH', 'REPAY', 'CREDIT']

const MESSAGE_STYLE: Partial<Record<LogStep, string>> = {
  SYS: 'text-cyan-200/70',
  SCAN: 'text-slate-500',
  TRIGGER: 'text-emerald-200',
  CREDIT: 'text-emerald-300',
}

export function ExecutionTerminal({ logs, network }: { logs: LogLine[]; network: Network }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const current = logs[logs.length - 1]?.step

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [logs])

  return (
    <section
      aria-labelledby="terminal-title"
      className="overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#060910] shadow-[0_0_40px_-20px_rgba(52,211,153,0.5)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 bg-[#0D1322] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-amber-400/80" />
            <span className="size-3 rounded-full bg-emerald-400/80" />
          </div>
          <h2 id="terminal-title" className="flex items-center gap-2 font-mono text-sm text-slate-300">
            <Terminal className="size-4 text-emerald-400" aria-hidden="true" />
            scanner+executor@{network === 'mainnet' ? 'mainnet-beta' : 'devnet'}
          </h2>
        </div>
        <ol className="flex flex-wrap items-center gap-1 font-mono text-[10px]" aria-label="Atomic transaction pipeline">
          {PIPELINE.map((step, i) => (
            <li key={step} className="flex items-center gap-1">
              <span
                className={`rounded px-1.5 py-0.5 transition-colors ${
                  current === step ? 'bg-emerald-400/20 text-emerald-300' : 'bg-white/5 text-slate-500'
                }`}
                aria-current={current === step ? 'step' : undefined}
              >
                {step}
              </span>
              {i < PIPELINE.length - 1 && <span className="text-slate-600" aria-hidden="true">{'›'}</span>}
            </li>
          ))}
        </ol>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="off"
        aria-label="Transaction logs"
        tabIndex={0}
        className="h-72 overflow-y-auto p-4 font-mono text-xs leading-relaxed focus-visible:outline-2 focus-visible:outline-emerald-400 sm:text-[13px]"
      >
        {logs.map((log) => {
          const style = STEP_STYLE[log.step]
          return (
            <p
              key={log.id}
              className={`flex flex-wrap gap-x-2 sm:flex-nowrap sm:gap-3 ${
                log.highlight ? '-mx-2 my-0.5 rounded bg-emerald-400/5 px-2' : ''
              }`}
            >
              <span className="shrink-0 text-slate-600">{log.time}</span>
              <span className={`w-20 shrink-0 font-semibold sm:w-24 ${style.className}`}>[{style.label}]</span>
              <span className={`basis-full sm:basis-auto ${MESSAGE_STYLE[log.step] ?? 'text-slate-300'}`}>
                {log.message}
              </span>
            </p>
          )
        })}
        <p className="mt-1 text-emerald-400" aria-hidden="true">
          {'>'} <span className="inline-block h-3.5 w-2 animate-pulse bg-emerald-400 align-middle" />
        </p>
      </div>
    </section>
  )
}

// ============================================================
// FILE: components/arb/dashboard.tsx
// ============================================================
'use client'

import { useState } from 'react'
import { useArbitrageEngine } from '@/lib/arbitrage-engine'
import { Header } from './header'
import { MetricCards } from './metric-cards'
import { ProfitChart } from './profit-chart'
import { SpreadMonitor } from './spread-monitor'
import { ExecutionTerminal } from './execution-terminal'
import { EngineStatusCard } from './engine-status'
import { WalletModal, type ConnectedWallet } from './wallet-modal'
import { WithdrawModal } from './withdraw-modal'

export function Dashboard() {
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null)
  const engine = useArbitrageEngine(wallet?.address ?? null)
  const [walletOpen, setWalletOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-[#090D16] text-slate-100">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_60%)]"
        aria-hidden="true"
      />
      <Header wallet={wallet} onWalletClick={() => setWalletOpen(true)} />

      <main className="relative mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <MetricCards
          balance={engine.balance}
          solBalance={engine.solBalance}
          txCount={engine.txCount}
          lastProfit={engine.lastProfit}
          onWithdraw={() => setWithdrawOpen(true)}
        />

        <EngineStatusCard status={engine.status} quotes={engine.quotes} onNetworkChange={engine.setNetwork} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ProfitChart data={engine.history} />
          <SpreadMonitor quotes={engine.quotes} />
        </div>

        <ExecutionTerminal logs={engine.logs} network={engine.status.network} />

        <p className="text-center text-xs text-slate-600">
          Simulated market data for demonstration · not connected to mainnet
        </p>
      </main>

      <WalletModal
        open={walletOpen}
        onClose={() => setWalletOpen(false)}
        wallet={wallet}
        onConnect={setWallet}
        onDisconnect={() => setWallet(null)}
      />
      <WithdrawModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        balance={engine.balance}
        wallet={wallet}
        onConnectWallet={() => setWalletOpen(true)}
        onWithdraw={engine.withdraw}
      />
    </div>
  )
}

```
