import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import {
  mainnet,
  sepolia,
  base,
  baseSepolia,
  bsc,
  bscTestnet,
  polygon,
  polygonMumbai,
  arbitrum,
  arbitrumSepolia,
  optimism,
  optimismSepolia,
  avalanche,
  avalancheFuji
} from "viem/chains"
import { cookieStorage, createStorage } from "wagmi"

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "your-project-id-here"

if (!projectId) {
  throw new Error("Project ID is not defined")
}

// All supported networks for the bridge
const supportedNetworks = [
  mainnet,
  sepolia,
  base,
  baseSepolia,
  bsc,
  bscTestnet,
  polygon,
  polygonMumbai,
  arbitrum,
  arbitrumSepolia,
  optimism,
  optimismSepolia,
  avalanche,
  avalancheFuji,
];

// Create a metadata object
const metadata = {
  name: "SideShift Bridge",
  description: "Cross-Chain Crypto Bridge powered by SideShift.ai",
  url: "https://bridge.sideshift.ai", // Update with your actual domain
  icons: ["https://sideshift.ai/img/sideshift-logo.svg"],
}

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  networks: supportedNetworks,
  projectId,
})

// Create the AppKit instance
createAppKit({
  adapters: [wagmiAdapter],
  networks: supportedNetworks,
  defaultNetwork: mainnet, // Ethereum Mainnet as default
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: false, // default to true
    socials: ["google", "x", "github", "discord", "apple"],
    emailShowWallets: true, // default to true
  },
})

export const config = wagmiAdapter.wagmiConfig
