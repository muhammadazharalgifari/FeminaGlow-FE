import { RiStarFill } from "react-icons/ri";
import userImpressionImage from "../assets/userImpressionImage.jpg";

const UserImpressionSection = () => {
  return (
    <section className="w-full h-[600px] bg-white font-poppins flex flex-col items-center pt-20 justify-center">
      <div className="flex flex-col items-center justify-center gap-6 mb-10">
        <h1 className="text-5xl font-extralight">
          Kesan Pengguna Pembeli Femina Glow ?
        </h1>
        <p className="text-base font-extralight">
          Testimoni setelah menggunakan Femina Glow
        </p>
      </div>

      <div className="flex items-center justify-center gap-20">
        <div className="flex items-center justify-center gap-4">
          <div className="flex w-[480px] h-[223px] bg-[#F8F3F3] max-w-xl gap-4 shadow-[10px_10px_20px_#FCE2CA]">
            <img
              src={userImpressionImage}
              alt="User Impression"
              className="w-[160.31px] h-[223px] object-cover"
            />
            <div className="flex flex-col gap-3 py-4">
              <h3 className="text-base font-light">Asiva Nurul</h3>
              <p className="text-sm font-extralight">
                Terimakasih femina glow setelah saya menggunakan femina glow
                saya dapat menyelesaikan permasalahan kulit wajah saya
              </p>
              <span className="text-sm font-extralight">
                Pengguna produk femina glow
              </span>
              <div className="flex gap-1">
                <RiStarFill className="fill-yellow-400 text-2xl" />
                <RiStarFill className="fill-yellow-400 text-2xl" />
                <RiStarFill className="fill-yellow-400 text-2xl" />
                <RiStarFill className="fill-yellow-400 text-2xl" />
                <RiStarFill className="fill-yellow-400 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex w-[480px] h-[223px] bg-[#F8F3F3] max-w-xl gap-4 shadow-[10px_10px_20px_#FCE2CA]">
            <img
              src={userImpressionImage}
              alt="User Impression"
              className="w-[160.31px] h-[223px] object-cover"
            />
            <div className="flex flex-col gap-3 py-4">
              <h3 className="text-base font-light">Salman Alfarisi</h3>
              <p className="text-sm font-extralight">
                Terimakasih femina glow setelah saya menggunakan femina glow
                saya dapat menyelesaikan permasalahan kulit wajah saya
              </p>
              <span className="text-sm font-extralight">
                Pengguna produk femina glow
              </span>
              <div className="flex gap-1">
                <RiStarFill className="fill-yellow-400 text-2xl" />
                <RiStarFill className="fill-yellow-400 text-2xl" />
                <RiStarFill className="fill-yellow-400 text-2xl" />
                <RiStarFill className="fill-yellow-400 text-2xl" />
                <RiStarFill className="fill-yellow-400 text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserImpressionSection;
