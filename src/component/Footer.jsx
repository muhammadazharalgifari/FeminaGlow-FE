import { AiFillInstagram, AiFillTikTok } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { SiShopee } from "react-icons/si";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  return (
    <section
      id="footer"
      className="w-full h-[256px] bg-[#FCE2CA] text-black justify-around items-center flex gap-6 font-poppins"
    >
      <div className="flex flex-col gap-4">
        <h1 className="font-pacifico text-4xl">Femina Glow</h1>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-sm font-extralight">Cantik Bersama Femina Glow</p>
          <p className="text-xs font-extralight">
            Senin - Jumat 09.00 - 17.00 WIB
          </p>
          <p className="text-xs font-extralight">Sabtu 09.00 - 15.00 WIB</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="" className="bg-white rounded-full p-2">
            <AiFillTikTok size={30} />
          </a>
          <a href="" className="bg-white rounded-full p-2">
            <SiShopee size={27} className="fill-orange-500" />
          </a>
          <a href="" className="bg-white rounded-full p-2">
            <AiFillInstagram size={30} className="fill-pink-500" />
          </a>
          <a href="" className="bg-white rounded-full p-2">
            <IoLogoWhatsapp size={27} className="fill-green-500" />
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="font-normal text-2xl">Menu</h1>
        <nav className="flex flex-col gap-2 mt-4 text-sm font-extralight cursor-pointer">
          <ScrollLink to="home" smooth={true} duration={500}>
            Home
          </ScrollLink>
          <ScrollLink to="about" smooth={true} duration={500}>
            Tentang Kami
          </ScrollLink>
          <ScrollLink to="product" smooth={true} duration={500}>
            Produk
          </ScrollLink>
          <ScrollLink to="promo" smooth={true} duration={500}>
            Promo
          </ScrollLink>
        </nav>
      </div>
      <div className="max-w-lg tracking-wider">
        <h1 className="text-4xl font-extralight">
          “ Mulai dari Femina GLow untuk mendapatkan hasil yang kita inginkan “
        </h1>
      </div>
    </section>
  );
};

export default Footer;
