import React from "react";
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.jpg";
import gallery5 from "../assets/gallery5.jpg";

const GallerySection = () => {
  return (
    <section className="w-full h-screen bg-white font-poppins flex flex-col items-center justify-center pt-80 mb-10">
      <div className="flex flex-col items-center justify-center gap-6 mb-10">
        <h1 className="text-4xl md:text-5xl font-extralight">Galeri Kami</h1>
        <p className="text-base tracking-wider font-extralight">
          Kesan dan pesan customer Femina Glow setelah menggunakannya
        </p>
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full max-w-5xl px-4">
        <img
          data-aos="zoom-in"
          data-aos-duration="1500"
          src={gallery1}
          alt="gallery1"
          className="col-span-2 row-span-1 w-[694.7px] h-[350px] object-cover rounded-md"
        />
        <img
          data-aos="zoom-out"
          data-aos-duration="1500"
          src={gallery2}
          alt="gallery2"
          className="col-span-1 row-span-1 w-[338px] h-[351px] object-cover rounded-md"
        />
        <img
          data-aos="flip-up"
          data-aos-duration="1500"
          src={gallery3}
          alt="gallery3"
          className="col-span-1 row-span-1 w-[320px] h-[320px] object-cover rounded-md"
        />
        <img
          data-aos="flip-left"
          data-aos-duration="1500"
          src={gallery4}
          alt="gallery4"
          className="col-span-1 row-span-1 w-[320px] h-[320px] object-cover rounded-md"
        />
        <img
          data-aos="flip-right"
          data-aos-duration="1000"
          src={gallery5}
          alt="gallery5"
          className="col-span-1 row-span-1 w-[338px] h-[323px] object-cover rounded-md"
        />
      </div>
    </section>
  );
};

export default GallerySection;
