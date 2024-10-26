import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

export function SendTokens() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);

  // Fetch balance when the wallet is connected
  useEffect(() => {
    const getBalance = async () => {
      if (wallet.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL); // Store balance in state
      }
    };

    getBalance();
  }, [connection, wallet.publicKey]);

  const sendTokens = async () => {
    if (!wallet.publicKey) {
      alert("Please connect your wallet.");
      return;
    }

    if (!toAddress || !amount) {
      alert("Please enter a valid recipient address and amount.");
      return;
    }

    const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

    if (lamports <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

    // Check the balance before sending
    if (lamports > balance * LAMPORTS_PER_SOL) {
      alert("Insufficient balance.");
      return;
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports,
        })
      );

      const signature = await wallet.sendTransaction(transaction, connection);
      console.log("Transaction Signature:", signature); // Log the signature

      // Confirm the transaction
      await connection.confirmTransaction(signature, "confirmed");
      alert(`Successfully sent ${amount} SOL to ${toAddress}`);

      // Update balance after sending
      const newBalance = await connection.getBalance(wallet.publicKey);
      setBalance(newBalance / LAMPORTS_PER_SOL); // Update balance in state
    } catch (error) {
      console.error("Error sending tokens:", error);
      alert("Failed to send tokens. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">Send SOL</h2>

        {/* Wallet Connection Button */}
        <div className="flex justify-center mb-4">
          <WalletMultiButton className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500" />
        </div>

        {/* Display Balance */}
        <div className="mb-4 text-center text-white">
          <p>SOL Balance:</p>
          <div className="text-lg">{balance.toFixed(4)}</div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium dark:text-gray-400">
            Recipient Public Key:
          </label>
          <input
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            placeholder="Enter recipient's public key"
            className="w-full p-2 mt-1 dark:bg-gray-700 dark:border-gray-600 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium dark:text-gray-400">
            Amount (in SOL):
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in SOL"
            className="w-full p-2 mt-1 dark:bg-gray-700 dark:border-gray-600 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={sendTokens}
          className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
