import React from "react";
import { GoShieldCheck } from "react-icons/go";
import { PiSyringe } from "react-icons/pi";
import { FaTruckFast } from "react-icons/fa6";

const WhyUsSection = () => {
  return (
    <section className="w-full h-[600px] bg-white flex flex-col items-center justify-center font-poppins gap-20">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-5xl font-extralight">Kenapa Harus Femina Glow ?</h1>
        <p className="text-base font-extralight max-w-2xl text-center">
          Femina Glow bukan hanya soal tampilan luar, tapi juga tentang membuat
          Anda merasa lebih percaya diri dan nyaman dengan diri sendiri setiap
          hari
        </p>
      </div>
      <div className="flex items-center justify-center gap-40">
        <div className="flex flex-col items-center gap-4">
          <GoShieldCheck className="text-9xl" />
          <p className="text-2xl">100 % Organic</p>
          <span className="text-base font-extralight max-w-72 text-center">
            Kami menggunakan bahan terbaik dari tumbuhan pilihan
          </span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <PiSyringe className="text-9xl -rotate-180" />
          <p className="text-2xl">Tanpa Merkuri</p>
          <span className="text-base font-extralight max-w-72 text-center">
            Tanpa menggunakan bahan merkuri yang berbahaya
          </span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <FaTruckFast className="text-9xl" />
          <p className="text-2xl">Pengiriman Cepat</p>
          <span className="text-base font-extralight max-w-56 text-center">
            Pengiriman dan proses antar yang sangat cepat
          </span>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
