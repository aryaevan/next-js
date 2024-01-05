// 'use client';

import ImageUpload from '@/component/imageupload';
import TextInput from '@/component/textinput';
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

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

export default function NewProduct() {
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

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* ---------------------- FORM START ---------------------- */}

            <TextInput name="pdname" label="Product Name" />

            <TextInput name="pdcategory" label="Category" />

            <TextInput name="pddesc" label="Description" />

            <TextInput name="pdprice" label="Price" />

            <ImageUpload />

            
            {/* ---------------------- FORM END ------------------------ */}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </div>
    </div>
  )
}
