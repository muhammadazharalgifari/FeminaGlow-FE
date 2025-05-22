import { AiOutlineInstagram, AiOutlineMail, AiOutlineWhatsApp } from "react-icons/ai";

const About = () => {
  return (
    <section
      id="about"
      className="w-full  h-screen bg-cover bg-center relative bg-[url('/src/assets/bg.jpg')]"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="w-full h-screen flex flex-col pl-[180px] pt-16 relative z-10 gap-6">
        <div
          className="max-w-xl bg-white p-8 rounded-lg shadow-lg"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <h1 className="font-pacifico font-light text-3xl">Tentang Kami</h1>
          <p className="font-poppins pt-6 text-justify tracking-wider">
            Femina Glow adalah toko online yang menghadirkan koleksi lengkap
            produk skincare, makeup, dan scrub berkualitas tinggi, yang
            dirancang untuk merawat dan mempercantik kulit Anda. Kami percaya
            bahwa kecantikan dimulai dengan perawatan yang tepat, dan kami
            berkomitmen untuk memberikan produk-produk terbaik yang aman,
            efektif, dan sesuai dengan berbagai kebutuhan kulit. Femina Glow
            hadir untuk mendukung perjalanan Anda menuju kulit yang sehat,
            bercahaya, dan penuh percaya diri!
          </p>
        </div>
        <div
          className="max-w-xl bg-white rounded-lg shadow-lg p-8"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <h1 className="text-3xl font-pacifico font-light pb-6">
            Kontak Kami
          </h1>
          <div className="gap-4 flex flex-col tracking-widest">
            <div className="flex items-center">
              <div className="w-[40px] h-[40px] flex items-center justify-center rounded-lg shadow-lg">
                <AiOutlineInstagram size={25} className="fill-pink-400" />
              </div>
              <h1 className="pl-4 font-poppins">Femina Glow</h1>
            </div>
            <div className="flex items-center">
              <div className="w-[40px] h-[40px] flex items-center justify-center rounded-lg shadow-lg">
                <AiOutlineWhatsApp size={25} className="fill-green-500" />
              </div>
              <h1 className="pl-4 font-poppins">081356782980</h1>
            </div>
            <div className="flex items-center">
              <div className="w-[40px] h-[40px] flex items-center justify-center rounded-lg shadow-lg">
                <AiOutlineMail size={25} className="fill-red-500" />
              </div>
              <h1 className="pl-4 font-poppins">FeminaGlow@gmail.com</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
