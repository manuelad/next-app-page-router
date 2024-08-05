import EditProductForm from '@/components/editProductForm'
import { getProduct } from '@/services/services'
import { Product } from '@prisma/client'
import React from 'react'


function EditProduct({ product }: { product: Product }) {
  return (
    <EditProductForm product={product} />
  )
}

export default EditProduct

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  return { props: { product } }

}

