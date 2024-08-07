import React from 'react'
import ProductForm from '@/components/productForm'

function CreateProductForm() {
    return (
        <main className='flex justify-center items-center flex-col'>
            <h1 className='text-4xl text-white font-bold mb-5'>Crear Producto</h1>
            <ProductForm className='text-white' />
        </main>
    )
}

export default CreateProductForm