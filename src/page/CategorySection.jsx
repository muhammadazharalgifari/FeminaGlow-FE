import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axiosInstance from "../../ax";

const CategorySection = () => {
  const {
    data: categories,
    isLoading: categoriesLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: async () => {
      try {
        const result = await axiosInstance.get("/api/categories");
        // console.log(result.data.data);
        return result.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <section
      id="product"
      className="w-full h-screen bg-white font-poppins flex flex-col justify-center items-center gap-10 pt-20 mb-10"
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-5xl font-extralight">Kategori Produk</h1>
        <p className="text-base tracking-wider font-extralight">
          Ini adalah kategori produk dari Femina Glow pilihlah sesuai kebutuhan
          anda
        </p>
      </div>

      {categoriesLoading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-36 font-poppins select-none">
          {categories.map((category) => (
            <Link to={`/product/${category.id}`}>
              <div
                className="relative group bg-[#FCE2CA] p-8 shadow-md rounded-lg w-[297px] h-[411px] flex items-center justify-center overflow-hidden transition duration-300"
                data-aos="zoom-in"
                data-aos-duration="1500"
                key={category.id}
              >
                {/* Gambar Kategori */}
                <img
                  src={`http://localhost:3888/public/${category.imageCategory}`}
                  alt={category.name}
                  className="w-[248px] h-[372px] object-cover rounded-lg z-10"
                />

                {/* Overlay Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-700 z-20 rounded-lg text-white p-6">
                  <h3 className="text-xl font-semibold tracking-widest uppercase">
                    {category.name}
                  </h3>
                  <p className="text-center text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
