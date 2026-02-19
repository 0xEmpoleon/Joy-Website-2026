"use client";
import Png from "@/assets/Png";
import Svg from "@/assets/Svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

const PrebookProcessor = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/api/products?limit=1`);

        if (!response.ok) {
          throw new Error("Failed to fetch product specifications");
        }

        const data = await response.json();
        if (data.products && data.products.length > 0) {
          setProduct(data.products[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching product specifications:", err);
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

  return (
    <>
      <div className="processor-prebook-container">
        <div className="grid-processor-main">
          <div className="grid-left-processor">
            <Image
              src={
                specs?.image
                  ? specs?.image.startsWith("http")
                    ? specs?.image
                    : `${
                        process.env.NEXT_PUBLIC_API_URL ||
                        "http://localhost:5000"
                      }${specs?.image}`
                  : Png.specefication
              }
              height={577}
              width={577}
              className="processor-img"
              alt="processor-icon"
            />
          </div>
          <div className="grid-right-processor">
            <div className="processor-bg">
              <div className="grid-processor-box">
                {specs.processor && (
                  <>
                    <div className="processor-card">
                      <div className="flex-process-mix-img">
                        {" "}
                        <Image
                          src={Svg.processor}
                          width={20}
                          height={20}
                          className="processor-icons"
                          alt="processor"
                        />
                      </div>

                      <p className="processor-mini-title">Processor</p>
                      <div className="process-card-details">
                        <p className="descrition-card-process">
                          {specs.processor}
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {specs.display && (
                  <>
                    <div className="processor-card">
                      <div className="flex-process-mix-img">
                        <Image
                          src={Svg.processor1}
                          width={20}
                          height={20}
                          className="processor-icons"
                          alt="processor"
                        />
                      </div>
                      <p className="processor-mini-title">Display</p>
                      <div className="process-card-details">
                        <p
                          className="descrition-card-process"
                          dangerouslySetInnerHTML={{
                            __html: specs.display.replace(/\n/g, "<br />"),
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {specs.memory && (
                  <>
                    <div className="processor-card">
                      <div className="flex-process-mix-img">
                        <Image
                          src={Svg.processor2}
                          width={20}
                          height={20}
                          className="processor-icons"
                          alt="processor"
                        />
                      </div>

                      <p className="processor-mini-title">Memory</p>
                      <div className="process-card-details">
                        <p className="descrition-card-process">
                          {specs.memory}
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {specs.connectivity && (
                  <>
                    <div className="processor-card">
                      <div className="flex-process-mix-img">
                        <Image
                          src={Svg.processor3}
                          width={20}
                          height={20}
                          className="processor-icons"
                          alt="processor"
                        />
                        <Image
                          src={Svg.processor4}
                          width={20}
                          height={20}
                          className="processor-icons"
                          alt="processor"
                        />
                      </div>

                      <p className="processor-mini-title">Connectivity</p>
                      <div className="process-card-details">
                        <p className="descrition-card-process">
                          {specs.connectivity}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {specs.os && (
                  <>
                    <div className="processor-card">
                      <div className="flex-process-mix-img">
                        <Image
                          src={Svg.processor2}
                          width={20}
                          height={20}
                          className="processor-icons"
                          alt="processor"
                        />
                      </div>

                      <p className="processor-mini-title">OS</p>
                      <div className="process-card-details">
                        <p className="descrition-card-process">{specs.os}</p>
                      </div>
                    </div>
                  </>
                )}
                {specs.storage && (
                  <>
                    <div className="processor-card">
                      <div className="flex-process-mix-img">
                        <Image
                          src={Svg.processor5}
                          width={20}
                          height={20}
                          className="processor-icons"
                          alt="processor"
                        />
                      </div>
                      <p className="processor-mini-title">Storage</p>
                      <div className="process-card-details">
                        <p className="descrition-card-process">
                          {specs.storage}
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {specs.battery && (
                  <>
                    <div className="processor-card">
                      <div className="flex-process-mix-img">
                        <Image
                          src={Svg.processor6}
                          width={20}
                          height={20}
                          className="processor-icons"
                          alt="processor"
                        />
                      </div>
                      <p className="processor-mini-title">Battery</p>
                      <div className="process-card-details">
                        <p className="descrition-card-process">
                          {specs.battery}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {specs.handling && (
                  <>
                    <div className="processor-card">
                      <div className="flex-process-mix-img">
                        <Image
                          src={Svg.processor7}
                          width={20}
                          height={20}
                          className="processor-icons"
                          alt="processor"
                        />
                      </div>
                      <p className="processor-mini-title">Handling</p>
                      <div className="process-card-details">
                        <p className="descrition-card-process">
                          {specs.handling}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {specs.security && specs.security.length > 0 && (
                  <>
                    <div className="processor-card">
                      <div className="flex-process-mix-img">
                        <Image
                          src={Svg.processor8}
                          width={20}
                          height={20}
                          className="processor-icons"
                          alt="processor"
                        />
                      </div>
                      <p className="processor-mini-title">Security</p>
                      <div className="process-card-details">
                        <ul>
                          {specs.security.map((item, index) => (
                            <li
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: item.replace(/\n/g, "<br />"),
                              }}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {specs.ports && specs.ports.length > 0 && (
                  <>
                    <div className="processor-card">
                      <div className="flex-process-mix-img">
                        <Image
                          src={Svg.processor8}
                          width={20}
                          height={20}
                          className="processor-icons"
                          alt="processor"
                        />
                      </div>
                      <p className="processor-mini-title">Ports</p>
                      <div className="process-card-details">
                        <ul>
                          {specs.ports.map((port, index) => (
                            <li key={index}>{port}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrebookProcessor;
