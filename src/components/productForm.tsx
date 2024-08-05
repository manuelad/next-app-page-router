
import { ProductDto } from '@/pages/types'
import { createProduct } from '@/services/services'
import React, { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'


const shema = z.object({
    name: z.string().trim().min(1, {
        message: 'name is required'
    }),
    description: z.string().trim().min(1, {
        message: 'description is required'
    })
})


function ProductForm() {

    const ref = useRef<HTMLFormElement>(null)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        const validate = shema.safeParse(data)
        if (!validate.success) {
            return toast.error(validate.error.errors.flatMap((error) => error.message).join(', '))
        }
        try {
            if (validate.success) {
                await createProduct(data as unknown as ProductDto)
                toast.success('product created')
            }
        } catch (error) {
            if (error instanceof Error)
                toast.error(error.message)
            toast.error('something went wrong')
        }
        ref.current?.reset()

    }
    return (
        <>
            <form
                ref={ref}
                onSubmit={onSubmit}
                className='max-w-md mx-auto border-neutral-200 rounded-md border-2 p-8'>

                <h1 className='text-3xl text-center mb-3'>Crear Producto</h1>
                <input
                    type="text"
                    name='name'
                    autoFocus
                    placeholder='nombre del producto'
                    defaultValue={undefined}
                    className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none
            focus:ring-2 focus:ring-blue-600 mb-5'
                />
                <textarea
                    name="description"
                    id="description"
                    defaultValue={undefined}
                    className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none
            focus:ring-2 focus:ring-blue-600 mb-5'
                    placeholder='descripcion del producto' />

                <button type='submit'
                    className='px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
                >
                    Crear Producto
                </button>
            </form>

            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                limit={2}
            />
        </>

    )
}

export default ProductForm