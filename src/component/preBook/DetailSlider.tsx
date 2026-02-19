import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Png from "@/assets/Png";
import Image from "next/image";
import Link from "next/link";

// Product info for this page
const PRODUCT_INFO = {
  name: "Play Solana Gen 1",
  edition: "WIF",
  price: 459.00,
  paylinkId: "69650ca33f5cef106876caa7"
};

// Helio Checkout Widget Component
function HelioCheckoutWidget({
  amount,
  productName,
  onSuccess,
  onCancel
}: {
  amount: string;
  productName: string;
  onSuccess: (paymentId: string, transactionHash: string) => void;
  onCancel: () => void;
}) {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.hel.io/assets/index-v1.js";
    script.type = "module";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    script.onload = () => {
      const container = document.getElementById("helioCheckoutContainer");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (container && (window as any).helioCheckout) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).helioCheckout(container, {
         paylinkId: "69650ca33f5cef106876caa7",
        theme: {"themeMode":"dark"},
        primaryColor: "#C4D77F",
        neutralColor: "#5A6578",
        display: "inline",
        

          onStartPayment: () => {
            console.log("Starting payment");
          },

          onPending: (event: any) => {
            console.log("Payment pending", event);
          },

          onSuccess: (event: any) => {
            console.log("Payment success", event);

            const paymentId =
              event?.paymentId || `helio_${Date.now()}`;

            const transactionHash =
              event?.transactionHash ||
              event?.txHash ||
              "";

            onSuccess(paymentId, transactionHash);
          },

          onError: (event: any) => {
            console.error("Payment error", event);
          },

          onCancel: () => {
            console.log("Cancelled payment");
            onCancel();
          }
        });
      }
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [amount, onSuccess, onCancel]);

  return (
    <div className="helio-modal-overlay" onClick={onCancel}>
      <div
        className="helio-modal-content-second"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="helio-close-btn" onClick={onCancel}>
          ✕
        </button>

        {/* Helio Inline Checkout */}
        <div
          id="helioCheckoutContainer"
          className="helio-container"
        />
      </div>
    </div>
  );
}

function DetailSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [showHelioWidget, setShowHelioWidget] = useState(false);

  const handleBuyNow = () => {
    setShowHelioWidget(true);
  };

  const handlePaymentSuccess = async (paymentId: string, transactionHash: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const preOrderResponse = await fetch(`${apiUrl}/api/pre-orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: {
            name: 'Helio Customer',
            email: 'helio@customer.com',
            phone: 'N/A'
          },
          productName: PRODUCT_INFO.name,
          selectedEdition: PRODUCT_INFO.edition,
          quantity: 1,
          notes: `Helio Payment\nPayment ID: ${paymentId}\nTransaction: ${transactionHash}`,
          paymentId: paymentId,
          transactionHash: transactionHash
        })
      });

      if (!preOrderResponse.ok) {
        throw new Error('Failed to create pre-order');
      }

      const preOrderResult = await preOrderResponse.json();

      alert(`Order placed successfully!\n\nOrder ID: ${preOrderResult.preOrder._id}\n\nThank you for your purchase!`);

      setShowHelioWidget(false);

    } catch (error) {
      console.error('Order creation error:', error);
      alert('Order creation failed. Please contact support.');
    }
  };

  const handlePaymentCancel = () => {
    setShowHelioWidget(false);
  };
  return (
    <>
      <div className="detail-slider-cards">
        <div className="detail-slider-container">
          <div className="detail-slider-content">
            <div className="grid-swiper-thumbs">
              <div className="left-thumbs-swiper">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper thumbs-slider"
                >
               
                    <SwiperSlide className="thumb-slider-inside position-relative">
                    <div className="thumb-slider-bg">
                      <Image
                        src={Png.prod5}
                        alt="HelmetFive"
                        className="thumbh-img"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="thumb-slider-inside">
                    <div className="thumb-slider-bg position-relative">
                      <Image
                        src={Png.prod2}
                        alt="HelmetFive"
                        className="thumbh-img"
                      />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide className="thumb-slider-inside position-relative">
                    <div className="thumb-slider-bg">
                      <Image
                        src={Png.prod3}
                        alt="HelmetFive"
                        className="thumbh-img"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="thumb-slider-inside position-relative">
                    <div className="thumb-slider-bg">
                      <Image
                        src={Png.prod4}
                        alt="HelmetFive"
                        className="thumbh-img"
                      />
                    </div>
                  </SwiperSlide>
                   <SwiperSlide className="thumb-slider-inside">
                    <div className="thumb-slider-bg position-relative">
                      <Image
                        src={Png.prod1}
                        alt="HelmetFive"
                        className="thumbh-img"
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="right-thumbs-swiper">
                <Swiper
                  spaceBetween={10}
                  slidesPerView="auto"
                  navigation={false}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2 thumbs-swiper-show"
                  style={{ width: "100%" }}
                >
                
                  <SwiperSlide className="thumb-slide-big-inside">
                    <div className="thumb-perview-slider-bg">
                      <Image
                        src={Png.prod5}
                        alt="HelmetFive"
                        className="thumbh-img"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="thumb-slide-big-inside">
                    <div className="thumb-perview-slider-bg">
                      <Image
                        src={Png.prod2}
                        alt="HelmetFive"
                        className="thumbh-video"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="thumb-slide-big-inside">
                    <div className="thumb-perview-slider-bg">
                      <Image
                        src={Png.prod3}
                        alt="HelmetFive"
                        className="thumbh-img"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="thumb-slide-big-inside">
                    <div className="thumb-perview-slider-bg">
                      <Image
                        src={Png.prod4}
                        alt="HelmetFive"
                        className="thumbh-img"
                      />
                    </div>
                  </SwiperSlide>
                    <SwiperSlide className="thumb-slide-big-inside">
                    <div className="thumb-perview-slider-bg">
                      <Image
                        src={Png.prod1}
                        alt="HelmetFive"
                        className="thumbh-img"
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <div className="detail-slider-right-content">
              <h6 className="solana-title">Play Solana Gen 1</h6>
              <p className="solana-sub-title">Edition: WIF</p>
              <div className="edition-wif-sec">
                <div className="edition-wif">
                  {/* <div className="nft-border-btn">
                                        <div className="nft-img-sec">
                                            <Image src={Png.OriginalIcon} width={44} height={44} alt="HelmetFive" className='nft-det-img duration-300 transition' />
                                        </div>
                                    </div> */}
                  <div className="nft-border-btn">
                    <div className="nft-img-sec">
                      <Image
                        src={Png.SolOgIcon}
                        width={44}
                        height={44}
                        alt="HelmetFive"
                        className="nft-det-img duration-300 transition"
                      />
                    </div>
                  </div>
                  {/* <div className="nft-border-btn">
                                        <div className="nft-img-sec">
                                            <Image src={Png.BoryokuIcon} width={44} height={44} alt="HelmetFive" className='nft-det-img duration-300 transition' />
                                        </div>
                                    </div>
                                    <div className="nft-border-btn">
                                        <div className="nft-img-sec">
                                            <Image src={Png.BR1Icon} width={44} height={44} alt="HelmetFive" className='nft-det-img duration-300 transition' />
                                        </div>
                                    </div>
                                    <div className="nft-border-btn">
                                        <div className="nft-img-sec">
                                            <Image src={Png.GIGAIcon} width={44} height={44} alt="HelmetFive" className='nft-det-img duration-300 transition' />
                                        </div>
                                    </div>
                                    <div className="nft-border-btn">
                                        <div className="nft-img-sec">
                                            <Image src={Png.WIFIcon} width={44} height={44} alt="HelmetFive" className='nft-det-img duration-300 transition' />
                                        </div>
                                    </div>
                                    <div className="nft-border-btn">
                                        <div className="nft-img-sec">
                                            <Image src={Png.EPIKIicon} width={44} height={44} alt="HelmetFive" className='nft-det-img duration-300 transition' />
                                        </div>
                                    </div>
                                    <div className="nft-border-btn">
                                        <div className="nft-img-sec">
                                            <Image src={Png.MonkeDAOIcon} width={44} height={44} alt="HelmetFive" className='nft-det-img duration-300 transition' />
                                        </div>
                                    </div>
                                    <div className="nft-border-btn">
                                        <div className="nft-img-sec">
                                            <Image src={Png.READYIcon} width={44} height={44} alt="HelmetFive" className='nft-det-img duration-300 transition' />
                                        </div>
                                    </div>
                                    <div className="nft-border-btn">
                                        <div className="nft-img-sec">
                                            <Image src={Png.FXNIcon} width={44} height={44} alt="HelmetFive" className='nft-det-img duration-300 transition' />
                                        </div>
                                    </div> */}
                </div>
              </div>
              {/* <p className='limited-edition-title'>Limited Edition</p> */}
              <div className="edition-wif-sec limited-edition-sec">
                {/* <div className="edition-wif">
                                    <div className="nft-border-btn">
                                        <div className="nft-img-sec">
                                            <Image src={Png.jupIcon} width={44} height={44} alt="HelmetFive" className='nft-det-img duration-300 transition' />
                                        </div>
                                    </div>
                                    <div className="nft-border-btn">
                                        <div className="nft-img-sec">
                                            <Image src={Png.bonkIcon} width={44} height={44} alt="HelmetFive" className='nft-det-img duration-300 transition' />
                                        </div>
                                    </div>
                                    <div className="nft-border-btn">
                                        <div className="nft-img-sec">
                                            <Image src={Png.pudgyIcon} width={44} height={44} alt="HelmetFive" className='nft-det-img duration-300 transition' />
                                        </div>
                                    </div>
                                </div> */}
                <p className="edition-price">$459.00</p>

                <div className="buy-now-sec">
                  <button
                    type="button"
                    className="common-yellow-btn"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                  {/* <button
                    type="submit"
                    className="common-yellow-btn learn-more-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? "Joining..." : "Buy Now"}
                    Learn More
                  </button> */}
                </div>
                <p className="return-pl-sec">
                  Placing an order for the PSG1 creates a binding purchase.
                  Until your unit is dispatched, your payment is treated as a
                  deposit under the{" "}
                  <Link href={"#"} className="footere-link">
                    Purchase Policy
                  </Link>
                  . After delivery, your statutory rights and our{" "}
                  <Link href={"#"} className="footere-link">
                    Return Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helio Payment Widget Modal */}
      {showHelioWidget && (
        <HelioCheckoutWidget
          amount={PRODUCT_INFO.price.toFixed(2)}
          productName={`${PRODUCT_INFO.name} - ${PRODUCT_INFO.edition}`}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
    </>
  );
}

export default DetailSlider;
