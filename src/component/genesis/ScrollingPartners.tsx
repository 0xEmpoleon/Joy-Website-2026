import React from 'react';

const partners = [
  { name: 'Solana', logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=040', url: 'https://solana.com/' },
  { name: 'Somnia', logo: 'https://somnia.network/favicon.ico', url: 'https://somnia.network/' },
  { name: 'Berachain', logo: 'https://www.berachain.com/favicon-32x32.png', url: 'https://www.berachain.com/' },
  { name: 'Moonbeam', logo: 'https://moonbeam.network/wp-content/uploads/2020/03/Moonbeam-Logo-Final-500px.png', url: 'https://moonbeam.network/' },
  { name: 'Good Games', logo: 'https://www.yieldguild.io/favicon.ico', url: 'https://www.yieldguild.io/' },
  { name: 'MoonPay', logo: 'https://www.moonpay.com/favicon.ico', url: 'https://www.moonpay.com/' },
  { name: 'Hyperplay', logo: 'https://hyperplay.xyz/favicon.ico', url: 'https://hyperplay.xyz/' },
];

const ScrollingPartners = () => {
  // Duplicate for seamless loop
  const displayPartners = [...partners, ...partners, ...partners];

  return (
    <div className="partners-marquee-container py-16">
      <div className="marquee">
        <div className="marquee-content">
          {displayPartners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-logo-box"
              title={partner.name}
            >
              <img src={partner.logo} alt={partner.name} />
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .partners-marquee-container {
          width: 100%;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.5);
          border-top: 1px solid var(--genesis-border);
          border-bottom: 1px solid var(--genesis-border);
          backdrop-filter: blur(5px);
        }
        .marquee {
          display: flex;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          animation: scroll 40s linear infinite;
          gap: 100px;
          padding: 30px 0;
          align-items: center;
        }
        .partner-logo-box {
          flex: 0 0 auto;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: grayscale(1) brightness(2.5);
          opacity: 0.5;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }
        .partner-logo-box:hover {
          opacity: 1;
          filter: grayscale(0) brightness(1);
          transform: scale(1.1);
        }
        .partner-logo-box img {
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: contain;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};

export default ScrollingPartners;
