export default function CategorySkeleton() {

    return (
    <div className="rounded-3xl bg-white h-[250px] loading-animation
    flex justify-center flex-wrap p-4 shadow-sm  border-2 border-gray-400">
    <div className="img-holder p-4 bg-gray-100 h-2/3 col-10 shadow-lg border border-gray-400 m-0 ">
    </div>
    <div className="first-icon w-[10rem] h-[1rem] shadow-lg border border-gray-400 bg-gray-100 m-0"></div>
    </div>
);
}
