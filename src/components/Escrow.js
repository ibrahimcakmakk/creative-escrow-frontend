import React, { useState } from "react";
import { useWallet } from "../context/WalletContext"; 
import { Connection, PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";
import idl from './idl.json'; 
import * as anchor from "@project-serum/anchor"; 

const programID = new PublicKey("ProgramID"); 
const network = "https://api.mainnet-beta.solana.com"; 

const Escrow = () => {
    const [amount, setAmount] = useState(0);
    const { publicKey, connected, wallet } = useWallet();
    const sellerPublicKey = '...'; 

    const createEscrow = async () => {
        const connection = new Connection(network);
        const provider = new AnchorProvider(connection, wallet, {});
        const program = new Program(idl, programID, provider);

        const escrowAccount = Keypair.generate();

        await program.rpc.initialize(new anchor.BN(amount), {
            accounts: {
                escrow: escrowAccount.publicKey,
                buyer: publicKey,
                seller: sellerPublicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [escrowAccount],
        });
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-green-600 mb-4">Create Escrow</h1>
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Enter Amount" 
                className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button 
                onClick={createEscrow} 
                disabled={!connected} 
                className={`py-2 px-4 rounded-md text-white transition duration-300 
                    ${connected ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
            >
                Create Escrow
            </button>
            {!connected && <p className="mt-2 text-red-500 font-semibold">Please connect your wallet to create an escrow.</p>}
        </div>
    );
};

export default Escrow;
