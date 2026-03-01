'use client';

import React, { useState, useEffect } from 'react';

interface WalletConnectProps {
  onConnect: (walletAddress: string) => void;
  onDisconnect: () => void;
}

export default function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  // Check if wallet is available (Phantom, Solflare, etc.)
  const isWalletAvailable = () => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return !!(window as any).solana || !!(window as any).phantom?.solana;
    }
    return false;
  };

  // Get wallet object
  const getWallet = () => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).phantom?.solana) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (window as any).phantom.solana;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).solana) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (window as any).solana;
      }
    }
    return null;
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!isWalletAvailable()) {
      alert('Please install a Solana wallet (like Phantom) to continue.');
      window.open('https://phantom.app/', '_blank');
      return;
    }

    setConnecting(true);

    try {
      const wallet = getWallet();

      if (!wallet) {
        throw new Error('Wallet not found');
      }

      // Connect to wallet
      const response = await wallet.connect();
      const address = response.publicKey.toString();

      setWalletAddress(address);
      onConnect(address);

      console.log('Connected to wallet:', address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      const wallet = getWallet();

      if (wallet) {
        await wallet.disconnect();
      }

      setWalletAddress(null);
      onDisconnect();

      console.log('Disconnected from wallet');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      const wallet = getWallet();

      if (wallet && wallet.isConnected && wallet.publicKey) {
        const address = wallet.publicKey.toString();
        setWalletAddress(address);
        onConnect(address);
      }
    };

    checkConnection();
  }, [onConnect]);

  // Format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="wallet-connect-container">
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          disabled={connecting}
          className="wallet-connect-btn"
        >
          {connecting ? 'Connecting...' : '🔗 Connect Wallet'}
        </button>
      ) : (
        <div className="wallet-connected">
          <span className="wallet-address">{formatAddress(walletAddress)}</span>
          <button onClick={disconnectWallet} className="wallet-disconnect-btn">
            Disconnect
          </button>
        </div>
      )}

      <style jsx>{`
        .wallet-connect-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 1rem 0;
        }

        .wallet-connect-btn {
          background: linear-gradient(135deg, #9945ff 0%, #14f195 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .wallet-connect-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(153, 69, 255, 0.4);
        }

        .wallet-connect-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .wallet-connected {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          border: 2px solid rgba(153, 69, 255, 0.5);
        }

        .wallet-address {
          font-family: sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .wallet-disconnect-btn {
          background: rgba(245, 87, 108, 0.5);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .wallet-disconnect-btn:hover {
          background: rgba(245, 87, 108, 0.7);
        }
      `}</style>
    </div>
  );
}
