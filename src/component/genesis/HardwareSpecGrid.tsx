import React from 'react';
import Widget from './Widget';
import Image from 'next/image';
import Png from '@/assets/Png';

const specs = [
  { label: 'Display', value: '7 Inch IPS Display', icon: 'monitor' },
  { label: 'Processor', value: 'AMD Ryzen 7 5825U', icon: 'cpu' },
  { label: 'Graphics', value: 'AMD Radeon Graphics', icon: 'gamepad' },
  { label: 'OS', value: 'Hyperplay OS', icon: 'settings', gridSpan: 'col-span-8' },
  { label: 'Memory', value: '16GB LPDDR4x', icon: 'cpu' },
  { label: 'Storage', value: '512GB SSD', icon: 'hard-drive' },
  { label: 'Battery', value: '4100mAh', icon: 'battery' },
  { label: 'Security', value: 'HW Wallet & EAL5+', icon: 'shield', gridSpan: 'col-span-4' },
];

const SpecCard = ({ label, value, gridSpan, className }: { label: string, value: React.ReactNode, gridSpan?: string, className?: string }) => (
  <Widget gridSpan={gridSpan || 'col-span-4'} className={`spec-widget ${className}`}>
    <div className="spec-content">
      <span className="spec-label">{label}</span>
      <div className="spec-value">{value}</div>
    </div>
  </Widget>
);

const HardwareSpecGrid = () => {
  return (
    <section className="genesis-specs py-24">
      <div className="genesis-container">
        <div className="genesis-grid">
          {specs.map((spec, index) => {
            let displayValue: React.ReactNode = spec.value;

            if (spec.label === 'OS') {
              displayValue = (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ height: '24px', display: 'flex', alignItems: 'center' }}>
                    <Image
                      src={Png.hyperplayFullWhite}
                      alt="HyperPlay"
                      height={20}
                      style={{ objectFit: 'contain', width: 'auto' }}
                    />
                  </div>
                </div>
              );
            }

            return (
              <SpecCard
                key={index}
                label={spec.label}
                value={displayValue}
                gridSpan={spec.gridSpan}
                className="spec-widget"
              />
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .py-24 { padding: 6rem 0; }
        :global(.spec-content) {
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: 100%;
          justify-content: flex-end;
          min-height: 140px;
          padding: 24px;
        }
        :global(.spec-label) {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: #BFF13F !important;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          opacity: 0.9;
          margin-bottom: 2px;
          font-weight: 500;
        }
        :global(.spec-value) {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.2;
        }
        :global(.spec-widget) {
          border-radius: 20px;
          background: linear-gradient(135deg, #0F0F0F 0%, #050505 100%);
          border: 1px solid rgba(255, 255, 255, 0.03);
        }
      `}</style>
    </section>
  );
};

export default HardwareSpecGrid;
