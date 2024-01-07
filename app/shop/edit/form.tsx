'use client';

import { Button, TextInput } from "@tremor/react";
import { useRef } from "react";

interface InputData {
    [key: string]: any;
  }

export default function EditForm(data:any){
    console.log("client data", data);
    console.log("productid",data.data.id);
    const productId = data.data.id;
    const inputDataRef = useRef<InputData>({});

    
    const merge = {
        name: data.data.name,
        breadcrumbs:data.data.breadcrumbs?.[0]?.name,
        description: data.data.description,
        price: data.data.price,
        images: data.data.images?.[0]?.src,
        colors: data.data.colors?.[0]?.name,
        sizes: data.data.sizes?.[0]?.name
    }
    
    inputDataRef.current = merge;
    
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
          const response = await fetch(`/api/products?id=${productId}`, {
            method: 'PUT',
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

    return(
        <>
            <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">New Product</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Input your product details for listing.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">
            {/* ---------------------- FORM START ---------------------- */}

            <TextInput 
              name="name" 
              placeholder="Product Name" 
              defaultValue={data.data.name}
              onChange={(e)=>{textChangeHandler(e)}}
              className='mb-4 mt-4'
              />

            <TextInput 
              name="breadcrumbs" 
              placeholder="Category"
              defaultValue={data.data.breadcrumbs?.[0]?.name}
              onChange={(e)=>{textChangeHandler(e)}} 
              className='mb-4'
              />

            <TextInput 
              name="description" 
              placeholder="Description" 
              defaultValue={data.data.description}
              onChange={(e)=>{textChangeHandler(e)}} 
              className='mb-4'
              />

            <TextInput 
              name="price" 
              placeholder="Price" 
              defaultValue={data.data.price}
              onChange={(e)=>{textChangeHandler(e)}} 
              className='mb-4'
              />

            <TextInput 
              name="images" 
              placeholder="image source" 
              defaultValue={data.data.images?.[0]?.src}
              onChange={(e)=>{textChangeHandler(e)}} 
              className='mb-4'
              />

            <TextInput 
              name="colors" 
              placeholder="Colors" 
              defaultValue={data.data.colors?.[0]?.name}
              onChange={(e)=>{textChangeHandler(e)}} 
              className='mb-4'
              />

            <TextInput 
              name="sizes" 
              placeholder="Sizes" 
              defaultValue={data.data.sizes?.[0]?.name}
              onChange={(e)=>{textChangeHandler(e)}} 
              />            

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
        </>
    );
}