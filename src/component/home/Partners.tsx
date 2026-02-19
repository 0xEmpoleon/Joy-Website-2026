"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Partner {
  _id: string;
  name: string;
  image: string;
  status: string;
  order: number;
}

function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/partners?limit=100`);

        if (!response.ok) {
          throw new Error('Failed to fetch partners');
        }

        const data = await response.json();
        // Filter only active partners
        const activePartners = data.partners.filter((p: Partner) => p.status === 'active');
        setPartners(activePartners);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching partners:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <div className="partners-main-sec">
        <div className="partners-inner">
          <div className="main-title-sec">
            <h6 className="main-title">Partners</h6>
          </div>
          <div className="partners-grid-sec">
            <p>Loading partners...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="partners-main-sec">
        <div className="partners-inner">
          <div className="main-title-sec">
            <h6 className="main-title">Partners</h6>
          </div>
          <div className="partners-grid-sec">
            <p>Unable to load partners. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="partners-main-sec">
        <div className="partners-inner">
          <div className="main-title-sec">
            <h6 className="main-title">Partners</h6>
          </div>
          <div className="partners-grid-sec">
            {partners.length > 0 ? (
              partners.map((partner) => (
                <div key={partner._id} className="partners-box">
                  <Image
                    src={partner.image.startsWith('http') ? partner.image : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${partner.image}`}
                    className='partners-img'
                    alt={partner.name}
                    width={200}
                    height={100}
                    unoptimized
                  />
                </div>
              ))
            ) : (
              <p>No partners available at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Partners;
