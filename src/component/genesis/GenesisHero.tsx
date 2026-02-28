import React from 'react';
import Image from 'next/image';

const GenesisHero = () => {
  return (
    <section className="genesis-hero">
      <div className="genesis-container flex flex-col items-center text-center">
        <h1 className="genesis-h1 mb-8 w-full">JOY GENESIS</h1>
        <div className="hero-product-video mb-12 flex justify-center w-full">
          <video
            src="https://playonjoy.com/renderjoy.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-5xl rounded-2xl shadow-2xl mx-auto"
            style={{ borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
          />
        </div>

        <div className="pre-book-cta flex flex-col items-center">
          <p className="genesis-body-text mb-6 uppercase tracking-widest text-genesis-accent">Community Card Sale Now Live</p>
          <div className="cta-form mb-8 flex gap-4">
            <input type="email" placeholder="Enter your email" className="cta-input" />
            <button className="main-btn genesis-cta-btn">Reserve Now</button>
          </div>
          <div className="hyperplay-branding flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest opacity-50">JOY OS powered by</span>
            <div className="flex items-center gap-2">
              <Image src="/globe.svg" alt="Hyperplay" width={20} height={20} className="invert opacity-80" />
              <span className="font-bold tracking-tighter text-xl">HyperPlay</span>
            </div>
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
