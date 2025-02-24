import React, { memo } from "react";
import ReactImageGallery from "react-image-gallery";
export const  ImageGallery = memo(function ImageGallery({images}) {

  return <div className="w-full md:w-2/5 rounded-lg overflow-hidden">
        <ReactImageGallery lazyLoad={true} showFullscreenButton={false} items={images} showBullets={true} showThumbnails={false} showPlayButton={false} renderItem={item => <div className="h-[400px] w-full overflow-hidden">
                <img src={item.original} alt="" className="h-full w-full object-contain" />
                </div>} />
        </div>;
}
)