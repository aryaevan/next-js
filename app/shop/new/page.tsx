'use client';

import ImageUpload from '@/component/imageupload';
// import TextInput from '@/component/textinput';
import { TextInput, Button } from '@tremor/react';

// {
//   id: 8,
//   name: 'Machined Mechanical Pencil',
//   href: '#',
//   price: '$35',
//   imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//   imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//   owner: userid,
//   description:
//   dtCreate:
//   dtUpdate:
// },

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useRef } from 'react';

interface InputData {
  [key: string]: string;
}

export default function NewProduct() {
  
  const inputDataRef = useRef<InputData>({});

  function textChangeHandler(e: React.ChangeEvent<HTMLInputElement>){
    const {name, value} = e.target 
    // console.log(name, value)
    switch (name) {
      default:
        inputDataRef.current[name] = value;
        break;
    }

    
  }

  async function submitHandler (){
    console.log("inputdata", inputDataRef)
  
    const mappedProductData = {
      name: inputDataRef.current.name,
      price: inputDataRef.current.price,
      href: '#',
      breadcrumbs: [{ id: 1, name: inputDataRef.current.breadcrumbs, href: '#' }],
      images: [{ src: inputDataRef.current.images, alt: `${inputDataRef.current.name} - Image` }],
      colors: [{ name: inputDataRef.current.colors, class: '', selectedClass: '' }],
      sizes: [{ name: inputDataRef.current.sizes, inStock: true }],
      description: inputDataRef.current.description,
      highlights: [],
      details: ''
    };

    console.log("mapped data", mappedProductData);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mappedProductData),
      });

      const result = await response.json();
      console.log(result);
      // setData(result);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }

  return (
  <div className='bg-white' >
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">New Product</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Input your product details for listing.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">
            {/* ---------------------- FORM START ---------------------- */}

            <TextInput name="name" placeholder="Product Name" onChange={(e)=>{textChangeHandler(e)}} className='mb-4 mt-4'/>

            <TextInput name="breadcrumbs" placeholder="Category" onChange={(e)=>{textChangeHandler(e)}} className='mb-4'/>

            <TextInput name="description" placeholder="Description" onChange={(e)=>{textChangeHandler(e)}} className='mb-4'/>

            <TextInput name="price" placeholder="Price" onChange={(e)=>{textChangeHandler(e)}} className='mb-4'/>

            <TextInput name="images" placeholder="image source" onChange={(e)=>{textChangeHandler(e)}} className='mb-4'/>

            <TextInput name="colors" placeholder="Colors" onChange={(e)=>{textChangeHandler(e)}} className='mb-4'/>

            <TextInput name="sizes" placeholder="Sizes" onChange={(e)=>{textChangeHandler(e)}} />            

            {/* <ImageUpload /> */}

            
            {/* ---------------------- FORM END ------------------------ */}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <Button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={submitHandler}
        >
          Save
        </Button>
      </div>
    </form>
    </div>
    </div>
  )
}
