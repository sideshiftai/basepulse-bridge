# SideShift Bridge

A standalone cross-chain cryptocurrency bridge powered by [SideShift.ai](https://sideshift.ai). Bridge any cryptocurrency between blockchain networks with a simple, user-friendly interface.

## Features

- ✅ **Multi-Chain Support**: Bridge between 14+ EVM networks
- ✅ **Any Token**: Support for hundreds of cryptocurrencies
- ✅ **Real-time Balance Display**: View wallet balances on source networks
- ✅ **Network Detection**: Automatic network switching prompts
- ✅ **Status Monitoring**: Real-time shift status tracking
- ✅ **Max Button**: Quick fill with automatic gas fee buffer
- ✅ **Swap Direction**: Easy swap between source and destination
- ✅ **Dark Mode**: Beautiful crypto-themed UI with dark mode support

## Supported Networks

- Ethereum (Mainnet & Sepolia)
- Base (Mainnet & Sepolia)
- Binance Smart Chain (BSC & Testnet)
- Polygon (Mainnet & Mumbai)
- Arbitrum (Mainnet & Sepolia)
- Optimism (Mainnet & Sepolia)
- Avalanche (C-Chain & Fuji)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Web3**: Wagmi + Viem for blockchain interactions
- **Wallet**: Reown AppKit (formerly WalletConnect)
- **API**: Axios for backend communication
- **Bridge**: SideShift.ai API integration

## Prerequisites

- Node.js 18+ and npm
- Running instance of [basepulse-api](../basepulse-api)
- Reown Project ID (get one at [https://cloud.reown.com](https://cloud.reown.com))

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Backend API URL (usually http://localhost:3001 for local development)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Reown (WalletConnect) Project ID
# Get one at https://cloud.reown.com
NEXT_PUBLIC_REOWN_PROJECT_ID=your-project-id-here
```

### 3. Start the Backend API

The bridge requires the `basepulse-api` backend to be running. See the [backend README](../basepulse-api/README.md) for setup instructions.

```bash
cd ../basepulse-api
npm run dev
```

### 4. Start the Development Server

```bash
npm run dev
```

The bridge will be available at [http://localhost:3002](http://localhost:3002)

## Scripts

- `npm run dev` - Start development server on port 3002
- `npm run build` - Build for production
- `npm run start` - Start production server on port 3002
- `npm run lint` - Run ESLint

## Project Structure

```
basepulse-bridge/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page (redirects to /bridge)
│   ├── bridge/              # Bridge page
│   │   └── page.tsx
│   └── globals.css          # Global styles
│
├── components/
│   ├── bridge/              # Bridge-specific components
│   │   ├── bridge-form.tsx           # Main bridge form
│   │   ├── bridge-deposit-view.tsx   # Deposit address view
│   │   ├── currency-selector.tsx     # Currency dropdown
│   │   └── network-selector.tsx      # Network dropdown
│   ├── ui/                  # shadcn/ui components
│   ├── theme-provider.tsx   # Dark mode provider
│   ├── wallet-provider.tsx  # Wagmi/Web3 provider
│   └── connect-wallet-button.tsx
│
├── hooks/
│   ├── use-sideshift.ts     # SideShift integration hooks
│   └── use-toast.ts         # Toast notifications
│
├── lib/
│   ├── api/
│   │   └── sideshift-client.ts  # Backend API client
│   ├── utils/
│   │   └── currency.ts      # Currency utilities
│   ├── utils.ts             # General utilities
│   └── wagmi.ts             # Wagmi/Web3 configuration
│
└── public/                  # Static assets
```

## How It Works

1. **Connect Wallet**: User connects their wallet via Reown AppKit
2. **Select Assets**: Choose source and destination currencies and networks
3. **Enter Amount**: Input amount or click Max to fill available balance
4. **Create Shift**: Click "Get Deposit Address" to create a bridge order
5. **Send Crypto**: Transfer the specified amount to the provided deposit address
6. **Monitor Status**: Track the shift status until completion
7. **Receive Funds**: Destination currency arrives in user's wallet

## Network Detection

The bridge automatically detects the user's connected network and:

- Shows balance only when on the correct source network
- Displays a prompt to switch networks if wallet is on different network
- Provides a "Switch Network" button for quick network changes
- Reserves 0.01 of native token for gas fees when using Max button

## API Integration

### Endpoints Used

- `GET /api/sideshift/supported-assets` - Fetch supported cryptocurrencies
- `GET /api/sideshift/pair/:depositCoin/:settleCoin` - Get pair info (min/max/rate)
- `POST /api/sideshift/create-shift` - Create bridge order
- `GET /api/sideshift/shift-status/:id` - Monitor shift status
- `GET /api/sideshift/user/:address` - Get user's shift history

### Backend Configuration

The bridge shares the `basepulse-api` backend with the polls dapp. Ensure the backend is configured and running before starting the bridge.

## Deployment

### Vercel Deployment

1. Push the project to GitHub
2. Import the repository in Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` - Your production backend API URL
   - `NEXT_PUBLIC_REOWN_PROJECT_ID` - Your Reown Project ID
4. Deploy

### Custom Deployment

```bash
# Build the project
npm run build

# Start production server
npm run start
```

The production server runs on port 3002 by default.

## Configuration

### Adding New Networks

1. Update `lib/wagmi.ts` - Add new chain to `supportedNetworks`
2. Update `components/bridge/bridge-form.tsx` - Add to `NETWORK_TO_CHAIN_MAP`
3. Update `lib/utils/currency.ts` - Add to `formatNetworkName`

### Customizing Theme

Edit `app/globals.css` to customize colors, spacing, and other theme variables.

## Troubleshooting

### "Project ID is not defined" Error

Make sure you've set `NEXT_PUBLIC_REOWN_PROJECT_ID` in your `.env.local` file.

### "Failed to fetch pair information" Error

- Ensure the backend API is running
- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Verify the selected token pair is supported by SideShift

### Balance Showing as 0

- Ensure you're connected to the source network
- Click "Switch Network" if prompted
- Wait a few seconds for balance to load

### Network Mismatch

The bridge will show "Switch to [Network] to see balance" if your wallet is on a different network than the selected source network. Click the "Switch Network" button to change networks.

## Contributing

This is a standalone extraction from the basepulse-app project. Any contributions should maintain the separation from poll-specific functionality.

## License

MIT

## Support

For issues and questions, please open an issue on GitHub or contact the development team.

## Related Projects

- [basepulse-api](../basepulse-api) - Backend API (shared with polls dapp)
- [basepulse-app](../basepulse-app) - Polls dapp on Base blockchain
