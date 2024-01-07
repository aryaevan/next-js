'use client';

  import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
  import { useState,useEffect } from 'react';
  
  export default function ProductList() {

    const [products, setProducts] = useState([])

    async function fetchList(){
      // fetch('/api/products').then((res)=> {console.log(res.json())})
      const result = await fetch('/api/products');
      if(result){
        const data = await result.json();
        setProducts(data);
      }
    }

    async function deleteItemHandler(id:string){
      try {
        await fetch(`/api/products?id=${id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Error deleting resource:', error);
      } finally {
        fetchList();
      }
    }

    function editItemHandler(id:string){
      window.location.replace(`/shop/edit?id=${id}`)
    }

    useEffect(() => {
      fetchList();
    }, [])
    

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product:any) => (
              <div key={product.id} className="group relative">
              <div>
                <a href={`/shop/${product.id}`}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                </a>
              </div>
              <div className="absolute top-2 right-2 flex items-center space-x-2">
                {/* Edit Button */}
                {/* <a href={`/edit/${product.id}`}> */}
                  <button 
                    className="text-gray-100 hover:text-gray-200 bg-gray-700 bg-opacity-50 px-2 py-1 rounded"
                    onClick={()=>editItemHandler(product.id)}
                    >
                    <PencilSquareIcon className="h-6 w-6 text-gray-100 hover:text-yellow-400" />
                  </button>
                {/* </a> */}
                {/* Delete Button */}
                {/* <a href={`/delete/${product.id}`}> */}
                  <button 
                    className="text-red-100 hover:text-red-200 bg-gray-700 bg-opacity-50 px-2 py-1 rounded"
                    onClick={() => deleteItemHandler(product.id)}
                    >
                    <TrashIcon className="h-6 w-6 text-gray-100 hover:text-red-500" />
                  </button>
                {/* </a> */}
              </div>
            </div>
            
              
            ))}
            
          </div>
        </div>
      </div>
    )
  }
  