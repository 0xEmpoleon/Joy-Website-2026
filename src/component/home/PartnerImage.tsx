import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Partner {
  _id: string;
  name: string;
  image: string;
  status?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  link: string;
}

interface PartnerImageProps {
  partners: Partner[];
}

const PartnerImage: React.FC<PartnerImageProps> = ({ partners }) => {
  // ✅ Show message if no partners
  if (!partners || partners.length === 0) {
    return (
      <div className="partner-img-listing text-center py-10">
        <p className="text-gray-500 text-lg">
          No partners available at the moment.
        </p>
      </div>
    );
  }
  return (
    <div className="partner-img-listing">
      <div className="partner-container">
        <div className="main-title-sec">
          <h6 className="main-title">Partners</h6>
        </div>
        <Swiper
          spaceBetween={0}
          speed={1500}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={false}
          pagination={false}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 0 },
            500: { slidesPerView: 3, spaceBetween: 0 },
            768: { slidesPerView: 5, spaceBetween: 0 },
            1300: { slidesPerView: 7, spaceBetween: 0 },
            1920: { slidesPerView: 7 },
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="ecommerce-hero-slider"
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner._id} className="partner-hero-slider">
              <div className="partner-cursor-main">
                <Link href={partner?.link || "#"} target="_blank" className="">
                <Image
                  unoptimized
                  src={
                    partner.image.startsWith("http")
                      ? partner.image
                      : `${
                          process.env.NEXT_PUBLIC_API_URL ||
                          "http://localhost:5000"
                        }${partner.image}`
                  }
                  width={100}
                  height={100}
                  alt={partner.name || "Partner"}
                  className="partner-icons"
                />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PartnerImage;
