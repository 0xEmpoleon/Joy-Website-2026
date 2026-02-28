import React from 'react';
import Image from 'next/image';

const GenesisHero = () => {
  return (
    <section className="genesis-hero">
      <div className="genesis-container flex flex-col items-center text-center">
        <h1 className="genesis-h1 mb-8 w-full">JOY GENESIS</h1>
        <div className="hero-product-video mb-12 flex justify-center w-full relative">
          {/* Intense Radial Glow as seen in Screenshot 5 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-radial-glow opacity-40 blur-[100px] pointer-events-none"></div>

          <video
            src="https://playonjoy.com/renderjoy.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-4xl rounded-2xl shadow-2xl mx-auto relative z-10"
            style={{ borderRadius: '24px', boxShadow: '0 30px 100px rgba(0,0,0,0.9)' }}
          />
        </div>

        <div className="pre-book-cta flex flex-col items-center">
          <p className="genesis-body-text mb-6 uppercase tracking-widest text-genesis-accent">Community Card Sale Now Live</p>
          <div className="cta-form mb-8 flex gap-4">
            <input type="email" placeholder="Enter your email" className="cta-input" />
            <button className="main-btn genesis-cta-btn">Reserve Now</button>
          </div>
          <div className="hyperplay-branding">
            <a
              href="https://hyperplay.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity"
            >
              <Image src="/hyperplay-logo-v3.png" alt="JOY OS powered by Hyperplay" width={220} height={40} className="object-contain" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .justify-center { justify-content: center; }
        .items-center { align-items: center; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .w-full { width: 100%; }
        .max-w-5xl { max-width: 64rem; }

        .genesis-hero {
          padding-top: 8rem;
          padding-bottom: 6rem;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 70vh;
        }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        
        .product-render-placeholder {
          filter: drop-shadow(0 0 50px var(--genesis-accent-glow));
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .cta-form {
          display: flex;
          gap: 12px;
          max-width: 500px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.05);
          padding: 8px;
          border-radius: 12px;
          border: 1px solid var(--genesis-border);
        }

        .cta-input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          padding: 12px 20px;
          font-family: 'InstrumentSans-Medium', sans-serif;
          outline: none;
        }

        .genesis-cta-btn {
          margin: 0 !important;
          padding: 12px 30px !important;
          height: auto !important;
        }
        .powered-by-text {
          font-family: 'SourceCodePro-Medium', monospace;
          font-size: 0.75rem;
          color: var(--genesis-accent);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-top: 1rem;
          opacity: 0.8;
        }
        .w-full { width: 100%; }
        .max-w-4xl { max-width: 56rem; }
        .mb-4 { margin-bottom: 1rem; }
      `}</style>
    </section>
  );
};

export default GenesisHero;
