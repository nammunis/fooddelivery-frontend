import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader';
import ProductCard from '../../components/productCard';
import { ShoppingBagIcon } from "@animateicons/react/lucide";
import { ProductLoader } from '../../components/productLoading';

export default function ProductPage() {
    const [product, setProdcut] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(import.meta.env.VITE_backendUrl + '/products/')
            .then((res) => {
                setProdcut(res.data);
                console.log(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className='w-full h-full'>
            {
                loading ? <ProductLoader/>:
                <div className='w-full flex flex-wrap gap-6 justify-center m-5 items-center px-4'>
                    {
                        product.map(
                            (item)=>{
                                return(
                                    <ProductCard key={item.productId || item._id} product={item}/>
                                )
                            }
                        )
                    }
                </div>
            }
        </div>
    )
}