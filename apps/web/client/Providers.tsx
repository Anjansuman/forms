// solana wallet connectors and providers
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter, CoinbaseWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui";

import { ReactNode, useMemo } from "react";

export function Providers({ children }: { children: ReactNode }) {
    const endpoint = clusterApiUrl("devnet");
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new CoinbaseWalletAdapter()
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint} >
            <WalletProvider wallets={wallets} autoConnect >
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );

}