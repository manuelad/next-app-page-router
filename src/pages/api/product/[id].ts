import prisma from "@/libs/prisma"
import { Product } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextApiRequest, NextApiResponse } from "next"


export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse<Product | { error: string }>
) {
    try {
        const { id } = req.query

        if (req.method === 'GET') {
            const product = await prisma.product.findFirst({
                where: { id: Number(id) }
            })
            if (!product)
                return res.status(404).json({ error: 'Product not found' })
            return res.status(200).json(product)
        }

        if (req.method === 'PUT') {
            const data = req.body
            data.id = Number(id)
            const product = await prisma.product.update({
                where: { id: Number(id) },
                data
            })
            return res.status(200).json(product)
        }

        if (req.method === 'DELETE') {
            const product = await prisma.product.delete({
                where: { id: Number(id) }
            })
            return res.json(product)
        }
    } catch (error) {
        console.log(error)
        if (error instanceof PrismaClientKnownRequestError) {
            console.log(error.code)
            if (error.code === 'P2025') {
                return res.status(404).json({ error: error.message })
            }

        }
        if (error instanceof Error)
            return res.status(500).json({ error: error.message })
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

