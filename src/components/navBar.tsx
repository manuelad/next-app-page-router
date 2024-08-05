
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function NavBar() {

    const router = useRouter()


    return (
        <nav className='display flex justify-between px-5 py-5'>
            <Link
                href="/"
            >
                <h1
                    className='text-2xl font-bold hover:bg-blue-500 rounded-md p-2 
                hover:cursor-pointer transition hover:scale-110'
                >
                    App Products Next
                </h1>
            </Link>
            <div>
                <ul className='flex justify-center gap-x-4'>
                    <li>
                        <Link
                            className={`${router.asPath === '/create-product' ? 'active' : 'normal'} `}
                            href='/create-product'>
                            Crear Producto
                        </Link>

                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default NavBar