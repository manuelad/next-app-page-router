// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/libs/prisma"
import { Product } from "@prisma/client"



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | { error: string } | Product>,
) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany()
      return res.status(200).json(products)
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message })
    }
  }
  if (req.method === 'POST') {
    try {
      const data = req.body
      console.log(data)
      const product = await prisma.product.create({
        data
      })
      console.log(product)
      return res.status(201).json(product)

    } catch (error) {
      console.log(error)
      if (error instanceof Error)
        return res.status(400).json({ error: error.message })
    }
  }
}





export const config = {
  api: {
    responseLimit: '8mb',
  },
}


