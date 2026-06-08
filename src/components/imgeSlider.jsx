import { image } from 'motion/react-client';
import React, { useState } from 'react'

export default function ImageSlider(props) {
    const images = props.images;
    const [activeImageIndex, setActiveImage] = useState(0)
  return (
    <div className='w-[400px] h-[500px]'>

        <img src={images[activeImageIndex]} className='w-full h-[400px] object-cover' />
        <div className='w-full h-[100px] flex flex-row justify-center items-center'>
            {
                images.map(
                    (image,index)=>{
                        return(
                            <img src={image} key={index} className={'w-[100px] h-[100px] object-cover'+(activeImageIndex==index && 'border-2 rounded-2xl border-amber-500')}
                            onClick={()=>{
                                setActiveImage(index)
                            }}
                            />
                        )
                    }
                )
            }
        </div>      
    </div>
  )
}
