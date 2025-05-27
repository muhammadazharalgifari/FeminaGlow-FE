import aboutSectionImage from "../assets/aboutSectionImage.png";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="w-full h-screen bg-white font-poppins flex flex-col justify-center"
    >
      <div className="flex items-center justify-evenly">
        <div className="flex flex-col gap-6">
          <div
            className="max-w-2xl"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <h1 className="font-extralight text-5xl">Tentang Kami</h1>
            <div className="flex flex-col gap-4 tracking-widest pt-6 font-extralight text-lg text-justify">
              <p>
                Femina Glow adalah destinasi kecantikan terpercaya yang
                menghadirkan produk-produk perawatan kulit dan kosmetik
                berkualitas tinggi untuk membantu setiap wanita tampil percaya
                diri dan bersinar alami. Kami percaya bahwa kecantikan sejati
                berasal dari perawatan yang tepat dan rasa cinta terhadap diri
                sendiri.
              </p>
              <p>
                Didirikan dengan semangat untuk memberdayakan wanita melalui
                perawatan diri, Feminna Glow menyediakan rangkaian produk
                pilihan yang telah teruji, aman, dan sesuai dengan kebutuhan
                kulit wanita Indonesia. Mulai dari skincare harian, perawatan
                intensif, hingga makeup yang mempercantik tanpa merusak, semua
                tersedia dalam satu tempat.
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-[393px] h-[393px]"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <img src={aboutSectionImage} alt="..." className="rounded-3xl" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
