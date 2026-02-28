import React from 'react';
import Widget from './Widget';
import Image from 'next/image';

const specs = [
  { label: 'Display', value: '7 Inch IPS Display', icon: 'monitor' },
  { label: 'Control', value: 'Hall Effect Joystick(s)', icon: 'gamepad' },
  { label: 'OS', value: 'Joy Game OS powered by Hyperplay', icon: 'settings', gridSpan: 'col-span-12' },
  { label: 'Wireless', value: 'WiFi 6E & Bluetooth 5.2', icon: 'wifi', gridSpan: 'col-span-8' },
  { label: 'Storage', value: '512GB SSD', icon: 'hard-drive' },
  { label: 'Memory', value: '16GB LPDDR4x RAM', icon: 'cpu' },
  { label: 'Connectivity', value: 'Type-C Port & 3.5mm Jack', icon: 'usb', gridSpan: 'col-span-12' },
  { label: 'Processor', value: 'AMD Ryzen 7 5825U', icon: 'cpu', gridSpan: 'col-span-6' },
  { label: 'Battery', value: '4100mAh Battery', icon: 'battery', gridSpan: 'col-span-6' },
  { label: 'Security', value: 'Built-In HW Wallet & Secure Element EAL5+', icon: 'shield', gridSpan: 'col-span-8' },
  { label: 'Social', value: 'Social Logins Enabled', icon: 'users', gridSpan: 'col-span-4' },
  { label: 'Camera', value: 'Rear Camera', icon: 'camera', gridSpan: 'col-span-4' },
  { label: 'Interaction', value: "7'' Touch Display", icon: 'touch' },
];

const HardwareSpecGrid = () => {
  return (
    <section className="genesis-specs py-24">
      <div className="genesis-container">
        <div className="genesis-grid">
          {specs.map((spec, index) => (
            <Widget key={index} gridSpan={spec.gridSpan || 'col-span-4'} className="spec-widget">
              <div className="spec-content">
                <span className="spec-label">{spec.label}</span>
                <h3 className="spec-value">{spec.value}</h3>
              </div>
            </Widget>
          ))}
        </div>
      </div>

      <style jsx>{`
        .py-24 { padding: 6rem 0; }
        .spec-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
          justify-content: flex-end;
          min-height: 120px;
        }
        .spec-label {
          font-family: 'SourceCodePro-Medium', monospace;
          font-size: 0.75rem;
          color: var(--genesis-accent);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.8;
        }
        .spec-value {
          font-family: 'InstrumentSans-SemiBold', sans-serif;
          font-size: 1.25rem;
          color: white;
          line-height: 1.3;
        }
        .spec-widget {
          border-radius: 16px;
          background: linear-gradient(135deg, #0A0A0A 0%, #050505 100%);
        }
      `}</style>
    </section>
  );
};

export default HardwareSpecGrid;
