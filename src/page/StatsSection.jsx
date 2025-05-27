import React from "react";

const StatsSection = () => {
  return (
    <section className="bg-[#FCE2CA] w-full h-[201px] font-poppins flex items-center justify-center gap-28">
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-medium">10000 +</p>
        <span className="text-xl font-extralight">Customer Merasa Puas</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-medium">2000 +</p>
        <span className="text-xl font-extralight">Pesanan Per Hari</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-medium">100 %</p>
        <span className="text-xl font-extralight">Keaslian Produk</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-medium">100 %</p>
        <span className="text-xl font-extralight">Kepercayaan Konsumen</span>
      </div>
    </section>
  );
};

export default StatsSection;
