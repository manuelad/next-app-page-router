import { ProductDto } from "@/pages/types"
import { Product } from "@prisma/client"

export async function loadProducts() {
    const res: Response = await fetch('http://localhost:3000/api/product', { cache: 'no-store' })
    if (!res.ok)
        throw new Error('Error obteniendo los productos')
    const data = await res.json()
    return data
}

export async function getProduct(id: String) {
    const res = await fetch(`http://localhost:3000/api/product/${id}`, { cache: 'no-store' })
    if (!res.ok)
        throw new Error('Error obteniendo el producto')
    const data = await res.json()
    // console.log(data)
    return data
}

export async function createProduct(product: ProductDto) {
    const res = await fetch('http://localhost:3000/api/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    if (!res.ok)
        throw new Error('Error creando el producto')
    const data = await res.json()
    return data
}

export async function editProduct(product: ProductDto) {
    const res = await fetch(`http://localhost:3000/api/product/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    console.log(res)
    if (!res.ok)
        throw new Error('Error editando el producto')
    const data = await res.json()
    return data
}