import React from 'react';
import Widget from './Widget';

const CommunitySaleSection = () => {
  return (
    <section className="community-sale py-24 relative overflow-hidden">
      <div className="genesis-container relative z-10">
        <div className="sale-content text-left max-width-800" style={{ margin: '0 0' }}>
          <h2 className="genesis-h2 mb-4 accent-text" style={{ textAlign: 'left', fontSize: '1.25rem' }}>Community Card Sale. JOY Genesis</h2>
          <h2 className="genesis-h1 large-hero" style={{ textAlign: 'left', marginBottom: '2rem', fontSize: '5rem' }}>Game. Earn. JOY!</h2>
          <p className="genesis-body-text mt-8 light-text" style={{ textAlign: 'left', margin: '0 0', maxWidth: '700px', fontSize: '1.25rem' }}>
            The first GameFi hardware publisher. A physical distribution gateway for Web3 gaming, bridging digital depth with tactical reality. The next-gen handheld gaming computer for a multi-chain world.
          </p>
        </div>
      </div>


      <style jsx>{`
        .py-32 { padding: 10rem 0; }
        .max-width-800 { max-width: 900px; margin: 0 auto; }
        .accent-text { 
          color: var(--genesis-accent);
          text-transform: uppercase;
          font-size: 1rem;
          letter-spacing: 0.2em;
        }
        .large-hero {
          font-size: 5rem;
          margin: 1rem 0;
        }
        .mt-8 { margin-top: 2rem; }
        .light-text {
          color: white;
          font-size: 1.5rem;
          max-width: 700px;
          margin: 2rem auto;
        }
      `}</style>
    </section>
  );
};

export default CommunitySaleSection;
