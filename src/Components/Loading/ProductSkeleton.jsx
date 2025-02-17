import "../../Components/Website/Products/product.css"
export default function ProductSkeleton() {

    return (
    <span className="rounded-3xl bg-white h-[515px] loading-animation
    flex justify-center flex-wrap p-4 shadow-sm  border-2 border-gray-400">
    <div className="img-holder p-4 bg-gray-100 h-60 w-[100%] shadow-lg border border-gray-400 m-0  ">
        <div className="img-holder-span w-[4rem] h-[1rem] shadow-lg border border-gray-400 bg-gray-100 "></div>
    </div>
    <div className="first-icon w-[10rem] h-[1rem] shadow-lg border border-gray-400 bg-gray-100 m-0"></div>
    <div className="second-icon-section w-[13em] h-[1rem] flex justify-between gap-2">
        <div className="second-icon shadow-lg border border-gray-400 bg-gray-100 "></div>
        <div className="second-icon shadow-lg border border-gray-400 bg-gray-100 "></div>
    </div>
    <div className="third-icon w-[10rem] h-[1rem] shadow-lg border border-gray-400 bg-gray-100"></div>
    </span>
);
}
