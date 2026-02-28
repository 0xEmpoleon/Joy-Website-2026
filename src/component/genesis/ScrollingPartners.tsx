import React from 'react';

const partners = [
    { name: 'Solana', logo: 'https://placehold.co/200x80/000000/FFFFFF?text=SOLANA' },
    { name: 'Moonbeam', logo: 'https://placehold.co/200x80/000000/FFFFFF?text=MOONBEAM' },
    { name: 'Somnia', logo: 'https://placehold.co/200x80/000000/FFFFFF?text=SOMNIA' },
    { name: 'Berachain', logo: 'https://placehold.co/200x80/000000/FFFFFF?text=BERACHAIN' },
    { name: 'Good Games', logo: 'https://placehold.co/200x80/000000/FFFFFF?text=GOOD+GAMES' },
    { name: 'Hyperplay', logo: 'https://placehold.co/200x80/000000/FFFFFF?text=HYPERPLAY' },
];

const ScrollingPartners = () => {
    // Duplicate the list for seamless loop
    const displayPartners = [...partners, ...partners];

    return (
        <div className="partners-marquee-container py-12">
            <div className="marquee">
                <div className="marquee-content">
                    {displayPartners.map((partner, index) => (
                        <div key={index} className="partner-logo-box">
                            <img src={partner.logo} alt={partner.name} />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .partners-marquee-container {
          width: 100%;
          overflow: hidden;
          background: var(--genesis-bg);
          border-top: 1px solid var(--genesis-border);
          border-bottom: 1px solid var(--genesis-border);
        }
        .marquee {
          display: flex;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          animation: scroll 30s linear infinite;
          gap: 60px;
          padding: 20px 0;
        }
        .partner-logo-box {
          flex: 0 0 auto;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: grayscale(1) brightness(2);
          opacity: 0.6;
          transition: opacity 0.3s ease, filter 0.3s ease;
        }
        .partner-logo-box:hover {
          opacity: 1;
          filter: grayscale(0) brightness(1);
        }
        .partner-logo-box img {
          height: 100%;
          width: auto;
          max-width: 180px;
          object-fit: contain;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
};

export default ScrollingPartners;
