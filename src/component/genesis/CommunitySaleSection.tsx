import React from 'react';
import Widget from './Widget';

const CommunitySaleSection = () => {
    return (
        <section className="community-sale py-32">
            <div className="genesis-container">
                <div className="sale-content text-center max-width-800">
                    <h2 className="genesis-h2 mb-8 accent-text">Community Card Sale. JOY Genesis</h2>
                    <p className="genesis-h1 large-hero">Sleek not meek.</p>
                    <p className="genesis-body-text mt-8 light-text">
                        Play indie gems, retro classics, and AAA on-chain games all on one powerful handheld gaming computer.
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
