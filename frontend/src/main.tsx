import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { clusterApiUrl } from "@solana/web3.js";
import { LayoutContextProvider } from "@livekit/components-react";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";
const network = WalletAdapterNetwork.Devnet;

const AppProvider = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <BrowserRouter>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]}>
            <WalletModalProvider>
              <LayoutContextProvider>
                <App />
              </LayoutContextProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </BrowserRouter>
    </ClerkProvider>
  );
};

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppProvider />
    </React.StrictMode>
  );
}
