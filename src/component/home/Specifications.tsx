"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Png from "@/assets/Png";

interface ProductSpecifications {
  image?: string;
  processor?: string;
  memory?: string;
  os?: string;
  battery?: string;
  security?: string[];
  display?: string;
  connectivity?: string;
  storage?: string;
  handling?: string;
  ports?: string[];
}

interface Product {
  _id: string;
  name: string;
  specifications: ProductSpecifications;
}

function Specifications() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/products?limit=1`);

        if (!response.ok) {
          throw new Error('Failed to fetch product specifications');
        }

        const data = await response.json();
        if (data.products && data.products.length > 0) {
          setProduct(data.products[0]); // Get the first active product
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching product specifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="specification-sec">
        <div className="specification-inner-sec">
          <div className="main-title-sec">
            <h6 className="main-title">Loading Specifications...</h6>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="specification-sec">
        <div className="specification-inner-sec">
          <div className="main-title-sec">
            <h6 className="main-title">Specifications unavailable</h6>
          </div>
        </div>
      </div>
    );
  }

  const specs = product.specifications;
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  // const imageUrl = specs.image
  //   ? (specs.image.startsWith('http') ? specs.image : `${apiUrl}${specs.image}`)
  //   : Png.specefication;

  return (
    <>
      <div className="specification-sec">
        <div className="specification-inner-sec">
          <div className="specification-left-sec">
            <div className="specification-left-inner">
              <div className="main-title-sec">
                <h6 className="main-title">{product.name} Specifications</h6>
              </div>
              <Image
                src={specs.image ? (specs.image.startsWith('http') ? specs.image : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${specs.image}`) : Png.specefication}
                className="half-console-img"
                alt="console"
                unoptimized
              />
            </div>
          </div>
          <div className="specification-right-sec">
            <div className="specification-grid-sec">
              {specs.processor && (
                <div className="specification-box">
                  <p className="specif-title">Processor</p>
                  <p className="specif-con">{specs.processor}</p>
                </div>
              )}

              {specs.display && (
                <div className="specification-box">
                  <p className="specif-title">Display</p>
                  <p className="specif-con" dangerouslySetInnerHTML={{ __html: specs.display.replace(/\n/g, '<br />') }} />
                </div>
              )}

              {specs.memory && (
                <div className="specification-box">
                  <p className="specif-title">Memory</p>
                  <p className="specif-con">{specs.memory}</p>
                </div>
              )}

              {specs.connectivity && (
                <div className="specification-box">
                  <p className="specif-title">Connectivity</p>
                  <p className="specif-con">{specs.connectivity}</p>
                </div>
              )}

              {specs.os && (
                <div className="specification-box">
                  <p className="specif-title">OS</p>
                  <p className="specif-con">{specs.os}</p>
                </div>
              )}

              {specs.storage && (
                <div className="specification-box">
                  <p className="specif-title">Storage</p>
                  <p className="specif-con">{specs.storage}</p>
                </div>
              )}

              {specs.battery && (
                <div className="specification-box">
                  <p className="specif-title">Battery</p>
                  <p className="specif-con">{specs.battery}</p>
                </div>
              )}

              {specs.handling && (
                <div className="specification-box">
                  <p className="specif-title">Handling</p>
                  <p className="specif-con">{specs.handling}</p>
                </div>
              )}

              {specs.security && specs.security.length > 0 && (
                <div className="specification-box">
                  <p className="specif-title">Security</p>
                  <ul className="specif-ul">
                    {specs.security.map((item, index) => (
                      <li key={index} className="specif-li" dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, '<br />') }} />
                    ))}
                  </ul>
                </div>
              )}

              {specs.ports && specs.ports.length > 0 && (
                <div className="specification-box">
                  <p className="specif-title">Ports</p>
                  <ul className="specif-ul">
                    {specs.ports.map((port, index) => (
                      <li key={index} className="specif-li">{port}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Specifications;
