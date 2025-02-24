export default function CategoryCard({ data }) {

    return (
        <div className="rounded-2xl p-3 hover:-translate-y-2 transition-all 
        duration-[0.4s] h-[250px] bg-white hover:shadow-xl cursor-pointer
        shadow-custom flex flex-col items-center justify-center border border-[#fbfbfb]">
            {/* Image */}
            <div className="relative col-10 h-2/3 rounded-lg overflow-hidden cursor-pointer">
                <img
                    src={("https://ecommerce-backend-production-5ad6.up.railway.app" + data.image)}
                    alt={data.title}
                    className="w-full h-full object-cover"/>
            </div>
            {/* Card Content */}
            <div className="flex flex-col mt-4 items-center truncate w-full h-full gap-2">
                <h4 className="text-[#333333] text-trnucate h-10 font-bold f-cairo">
                    {data.title}
                </h4>
            </div>
        </div>
    );
}
