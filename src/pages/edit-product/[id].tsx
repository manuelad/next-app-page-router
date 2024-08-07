import { getProduct } from '@/services/services'
import React from 'react'
import { ProductDto } from '@/pages/types'
import ProductForm from '@/components/productForm'

type Props = {
  product: ProductDto
}

type ServerSideProps = {
  params: { id: string }
}


function EditProduct({ product }: Props) {
  return (
    <main className='flex justify-center items-center flex-col'>
      <h1 className='text-4xl text-white font-bold mb-5'>Editar Producto</h1>
      <ProductForm initialValues={product} />
    </main>

  )
}

export default EditProduct

export async function getServerSideProps({ params }: ServerSideProps) {
  const product = await getProduct(params.id)

  return { props: { product } }

}

