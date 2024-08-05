
import TableProducts from "@/components/table"
import { loadProducts } from "@/services/services"
import { Product } from "@prisma/client"
import React from "react"


function Index({ data }: { data: Product[] }) {

  // console.log(data)
  return (
    <main className="flex justify-center items-center mt-10">
      <TableProducts className="w-[75%]" dataSource={data} />
    </main>
  )
}

export async function getServerSideProps() {

  const products: Product[] = await loadProducts()
  return { props: { data: products } }

}

export default Index