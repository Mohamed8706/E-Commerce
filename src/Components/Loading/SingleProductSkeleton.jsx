export default function SingleProductSekelton() {

    return (
            
            <div className="w-full flex gap-10 mt-10 lg:gap-32 flex-wrap">
                <div className="w-full md:w-2/5 loading-animation flex justify-center h-72 rounded-lg  overflow-hidden">
                    <div className="img-holder p-4 gap-4 flex items-end justify-center
                        bg-gray-200 md:h-full col-10 border-[2px]  border-gray-700 m-0 ">
                        <div className="w-6 h-6 bg-gray-600 rounded-full">
                        </div>
                        <div className="w-6 h-6 bg-gray-600 rounded-full">
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-2/5">
                {/* Card Content */}
                    <div className="flex flex-col flex-wrap f-cairo w-full px-10 h-full gap-9">
                        {/* Header And Stars*/}
                        <div className="bg-gray-200 loading-animation 
                        w-2/3 h-6 rounded-2xl border-[1px] border-gray-700"></div>
                        <div className="flex w-1/3 justify-start items-center gap-2">
                            {Array.from({length: 5}).map((star) => {
                                return <div className="bg-gray-200 loading-animation 
                                    w-8 h-8 rounded-full border-[1px] border-gray-700"></div>})}
                        </div>

                        {/* Price And Quantity */}
                        <div className="flex w-full flex-wrap gap-3 mt-1  justify-between">
                        <div className="bg-gray-200 loading-animation 
                        w-1/3 h-6 rounded-2xl border-[1px] border-gray-700"></div>
                        <div className="bg-gray-200 loading-animation 
                        w-1/3 h-6 rounded-2xl border-[1px] border-gray-700"></div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-row justify-between">
                        <div className="bg-gray-200 loading-animation 
                        w-1/3 h-6 rounded-2xl border-[1px] border-gray-700"></div>
                        <div className="bg-gray-200 loading-animation 
                        w-1/3 h-6 rounded-2xl border-[1px] border-gray-700"></div>
                        </div>

                        {/* Total Price And add to cart*/}
                        <div className="flex items-center justify-between flex-wrap">
                        <div className="bg-gray-200 loading-animation 
                        w-1/3 h-6 rounded-2xl border-[1px] border-gray-700"></div>
                        <div className="bg-gray-200 loading-animation 
                        w-1/3 h-6 rounded-2xl border-[1px] border-gray-700"></div>
                        </div>

                    </div>
                
                </div>
                
            </div>


);
}







    <div className="rounded-3xl bg-white h-[250px] animate-animated hover:animate-pulse
    flex justify-center flex-wrap p-4 shadow-sm  border-2 border-gray-400">
    <div className="img-holder p-4 bg-gray-100 h-2/3 col-10 shadow-lg border border-gray-400 m-0 ">
    </div>
    <div className="first-icon w-[10rem] h-[1rem] shadow-lg border border-gray-400 bg-gray-100 m-0"></div>
    </div>