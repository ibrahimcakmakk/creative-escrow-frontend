import React, { createContext, useContext, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

const WalletContext = createContext();

export const WalletContextProvider = ({ children }) => {
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
    
    return (
        <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
            <WalletProvider wallets={wallets}>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const useWallet = () => useContext(WalletContext);
