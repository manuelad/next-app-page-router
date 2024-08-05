import { editProduct } from '@/services/services'
import { Product } from '@prisma/client'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ProductDto } from '@/pages/types'
import { z } from 'zod'
import { useRouter } from 'next/router'


const shema = z.object({
    name: z.string().trim().min(1, {
        message: 'name is required'
    }),
    description: z.string().trim().min(1, {
        message: 'description is required'
    })
})


function EditProductForm({ product }: { product: Product }) {

    const router = useRouter()

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)
        const validate = shema.safeParse(data)
        if (!validate.success)
            return toast.error(validate.error.errors.flatMap((error) => error.message).join(', '))

        try {
            await editProduct(data as unknown as ProductDto)
            router.push('/')
        } catch (error) {
            if (error instanceof Error)
                toast.error(error.message)
            toast.error('something went wrong')
        }
    }
    return (
        <>
            <form
                onSubmit={onSubmit}
                className='max-w-md mx-auto border-neutral-200 rounded-md border-2 p-8'>

                <h1 className='text-3xl text-center mb-3'>Editar Producto</h1>
                <input type="hidden" name='id' value={product.id} />
                <input
                    type="text"
                    name='name'
                    autoFocus
                    placeholder='nombre del producto'
                    defaultValue={product.name}
                    className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none
    focus:ring-2 focus:ring-blue-600 mb-5'
                />
                <textarea
                    name="description"
                    id="description"
                    defaultValue={product.description}
                    className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none
    focus:ring-2 focus:ring-blue-600 mb-5'
                    placeholder='descripcion del producto' />

                <button type='submit'
                    className='px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
                >
                    Editar Producto
                </button>
            </form>
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                bodyClassName='bg-red-600 text-white rounded-md border-0 border-red-600 font-semibold'
                limit={2}
            />

        </>
    )
}

export default EditProductForm