

import { Table, type TableProps } from 'antd'
import Link from 'next/link'
import { Product } from '@prisma/client'
import { useRouter } from 'next/router'


function TableProducts(props: TableProps<Product>) {

    const router = useRouter()

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const id = formData.get('id')
        const res = await fetch(`http://localhost:3000/api/product/${id}`, {
            method: 'DELETE',
        })
        if (res.ok) {
            router.push('/')
        }
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

                    <form onSubmit={onSubmit}>
                        <input type="hidden" name="id" value={record.id} />
                        <button type='submit'
                            className='bg-red-400 text-white p-2 rounded-md font-semibold'
                        >Eliminar</button>
                    </form>


                </div>
            ),
        },
    ]

    return (
        <Table {...props} rowClassName="bg-slate-900 hover:bg-slate-900" columns={columns} rowKey={record => record.id} />
    )
}

export default TableProducts