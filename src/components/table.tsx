

import { Table, type TableProps } from 'antd'
import Link from 'next/link'
import { Product } from '@prisma/client'
import { useState } from 'react'
import { deleteProduct } from '@/services/services'


function TableProducts(props: TableProps<Product>) {
    const [products, setProducts] = useState(props.dataSource)

    const handleDelete = (product: Product) => async () => {
        await deleteProduct(product)
        setProducts(prevProducts => prevProducts?.filter(p => p.id !== product.id))
    }

    const columns: TableProps<Product>['columns'] = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            className: 'hover:bg-slate-500',
            render: (text) => <h1 className='text-white font-semibold'>{text}</h1>,
        },
        {
            title: 'descripcion',
            dataIndex: 'description',
            render: (text) => <p className='text-white text-sm' >{text}</p>
        },
        {
            title: 'Fecha de creacion',
            dataIndex: 'createdAt',
            render: (text) => <h1 className='text-white text-sm'>{new Date(text).toDateString()}</h1>,
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (
                <div className='flex justify-between'>
                    <Link
                        className='bg-blue-400 text-white p-2 rounded-md font-semibold'
                        href={`/edit-product/${record.id}/`}>Editar</Link >

                    <button onClick={handleDelete(record)}
                        className='bg-red-400 text-white p-2 rounded-md font-semibold'
                    >Eliminar</button>



                </div>
            ),
        },
    ]

    return (
        <Table {...props} dataSource={products} rowClassName="bg-slate-900 hover:bg-slate-900" columns={columns} rowKey={record => record.id} />
    )
}

export default TableProducts


