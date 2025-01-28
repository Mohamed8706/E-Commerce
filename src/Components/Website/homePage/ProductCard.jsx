import { Heart } from "lucide-react";
import "../../../Assets/grocery.jpg"
export default function ProductCard({data}) {
    console.log(data.image)
    return(
        <div  className="rounded-2xl p-3 bg-white hover:shadow-xl shadow-custom border border-[#fbfbfb]">
            <div className="relative w-full rounded-lg overflow-hidden cursor-pointer">
                <img  src={require("../../../Assets/grocery.jpg")} alt={data.title} className="w-full" />
                <span className="absolute bg-gray-50 rounded-full 
                top-1 right-1 w-12 h-12 flex justify-center cursor-pointer items-center"><Heart /></span>
            </div>
            <div className="flex flex-col my-3 w-full">
            <h4 className="text-[#333333] font-semibold f-cairo">{data.title}</h4>

            </div>

        </div>
    )
}