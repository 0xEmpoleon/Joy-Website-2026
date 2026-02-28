import React from 'react';
import Widget from './Widget';

const VerbatimSections = () => {
    return (
        <section className="genesis-verbatim py-24">
            <div className="genesis-container">
                <div className="genesis-grid">
                    {/* About Us */}
                    <Widget gridSpan="col-span-6" className="verbatim-card">
                        <h2 className="genesis-h2 mb-6">About Us</h2>
                        <p className="genesis-body-text">
                            With a combined 30+ years in semiconductor design & manufacturing, from 32nm to 7nm chips, the Joy Team have extensive experience in developing hardware and operating within Web3. The team previously worked on Playstation and Xbox gaming consoles and have run successful crypto hardware manufacturing companies. Safe to say, our roots are firmly rooted in gaming, from retro game consoles to modern handheld gaming pcs.
                            <br /><br />
                            Joy Studios is our native gaming IP house and our team directly supports all Joy Ecosystem games alongside the wider Web3 gaming economy. We never stop gaming; we get gamers.
                        </p>
                    </Widget>

                    {/* What is Joy */}
                    <Widget gridSpan="col-span-6" className="verbatim-card">
                        <h2 className="genesis-h2 mb-6">What is Joy</h2>
                        <p className="genesis-body-text">
                            JOY Genesis is the first Web3 gaming console capable of playing your beloved AAA titles and indie games. Optimised for the future of gaming, the device is powered by <strong>Joy Game OS powered by Hyperplay</strong>, and fully equipped with a camera and hardware wallet embedded for on-device identity and ownership. Discover the greatest of on-chain games, engage to earn with Joy’s ecosystem, and have a stake in the gaming communities you live and breathe in.
                        </p>
                    </Widget>
                </div>
            </div>

            <style jsx>{`
        .py-24 { padding: 6rem 0; }
        .mb-6 { margin-bottom: 1.5rem; }
        .verbatim-card {
          padding: 40px !important;
          border-color: rgba(255, 255, 255, 0.05);
        }
        .genesis-h2 {
          font-size: 2rem;
          letter-spacing: -0.01em;
        }
      `}</style>
        </section>
    );
};

export default VerbatimSections;
