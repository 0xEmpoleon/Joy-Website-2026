import React from 'react';
import Image from 'next/image';

const GenesisHeader = () => {
  return (
    <header className="genesis-header">
      <div className="genesis-container flex justify-between items-center py-6">
        <div className="genesis-logo">
          <Image src="/joy-logo-final.png" alt="JOY" width={60} height={60} priority />
        </div>
        <div className="genesis-nav flex gap-6 items-center">
          <a
            href="https://v0-joyconsole.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="genesis-nav-link"
          >
            Skinned Devices
          </a>
          <button className="genesis-mint-btn">
            Mint NFT
          </button>
        </div>
      </div>
      <style jsx>{`
        .genesis-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--genesis-border);
        }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .gap-6 { gap: 1.5rem; }
        .genesis-nav-link {
          color: var(--genesis-text-secondary);
          text-decoration: none;
          font-family: 'Inter', monospace;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.3s ease;
        }
        .genesis-nav-link:hover {
          color: var(--genesis-accent);
        }
        .genesis-mint-btn {
          background: transparent;
          border: 1px solid var(--genesis-accent);
          color: var(--genesis-accent);
          padding: 8px 20px;
          border-radius: 200px;
          font-family: 'Inter', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .genesis-mint-btn:hover {
          background: var(--genesis-accent);
          color: var(--genesis-bg);
          box-shadow: 0 0 15px var(--genesis-accent-glow);
        }
      `}</style>
    </header>
  );
};

export default GenesisHeader;
