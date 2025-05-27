import "aos/dist/aos.css";
import { TiShoppingCart } from "react-icons/ti";
import { Link as ScrollLink } from "react-scroll";
import background from "../assets/background.png";
import heroSectionImage from "../assets/heroSectionImage.png";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import AboutSection from "./AboutSection";
import CategorySection from "./CategorySection";
import GallerySection from "./GallerySection";
import ProductPromo from "./product/ProductPromo";
import StatsSection from "./StatsSection";
import UserImpressionSection from "./UserImpressionSection";
import WhyUsSection from "./WhyUsSection";

const Dashboard = () => {
  return (
    <section className="w-full h-screen bg-white " id="home">
      {/* Navbar */}
      <Navbar />

      {/* Section 1: Hero Section */}
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Hero Content */}
        <section
          className="w-full h-screen flex flex-col justify-center"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <div className="flex items-center justify-around pl-24 text-black font-poppins select-none">
            <div className="flex flex-col gap-4 max-w-2xl">
              <h1 className="text-6xl font-semibold">Selamat Datang</h1>
              <p className="text-3xl">di Femina Glow.</p>
              <p className="text-lg font-extralight tracking-widest">
                Menghadirkan Pesona Alami dan Kepercayaan Diri Melalui Perawatan
                Kecantikan Terbaik, Inovatif, dan Ramah Lingkungan Karena Setiap
                Wanita Berhak Bersinar Dengan Versi Terbaik Dirinya.
              </p>
              <ScrollLink
                to="product"
                smooth={true}
                duration={500}
                className="text-white font-poppins bg-[#D8AE7E] w-60 h-14 items-center flex justify-center rounded-full shadow-lg font-semibold hover:bg-[#E3BA8B] transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <TiShoppingCart className="text-2xl" />
                  <p>Belanja Sekarang</p>
                </div>
              </ScrollLink>
            </div>
            <div className="w-[592px] h-[887px]">
              <img src={heroSectionImage} alt="Hero Section Image" />
            </div>
          </div>
        </section>
      </div>

      {/* Section 2: Stats Section */}
      <StatsSection />

      {/* Section 3: Why Us Section */}
      <WhyUsSection />

      {/* Section 3: About Us Section */}
      <AboutSection />

      {/* Section 4: Kategori Produk Section */}
      <CategorySection />

      {/* Section 5: Gallery Section */}
      <GallerySection />

      {/* Section 5: Promo Section */}
      <ProductPromo />

      {/* Section 6: Kesan Pengguna Section */}
      <UserImpressionSection />

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default Dashboard;
