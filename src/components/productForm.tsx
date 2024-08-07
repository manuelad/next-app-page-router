import React from 'react'
import { Button, message, Form, Input, FormProps, } from 'antd'
import { createProduct, editProduct } from '@/services/services'
import { ProductDto } from '@/pages/types'
import { useRouter } from 'next/router'


type FieldType = ProductDto

type props = {
    product?: ProductDto
}

export const ProductForm: React.FC<FormProps<FieldType>> = (props: FormProps<FieldType>) => {


    const [form] = Form.useForm()
    const router = useRouter()


    const addProduct = async () => {
        try {
            const product = form.getFieldsValue()
            await createProduct(product)
            form.resetFields()
            message.success('Producto creado exitosamente')
        } catch (error) {
            message.error('Ha ocurrido un error al crear el producto')
        }

    }

    const buttonTitle = props.initialValues ? 'Editar' : 'Crear'


    const setProduct = async (id: number) => {
        try {
            let product = form.getFieldsValue({ strict: true })
            product = { ...product, id }
            await editProduct(product)
            router.push('/')
        } catch (error) {
            message.error('Ha ocurrido un error al editar el producto')
        }
    }

    const onFinishSuccess: FormProps<FieldType>['onFinish'] = async () => {
        if (props.initialValues && props.initialValues.id)
            await setProduct(props.initialValues.id)
        else
            await addProduct()

    }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        message.error(errorInfo.errorFields.map((field) => field.errors[0]).join('\n'))
    }

    return (

        <Form
            {...props}
            form={form}
            className='w-[75%]'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, color: 'white' }}
            autoComplete="off"
            onFinishFailed={onFinishFailed}
            onFinish={onFinishSuccess}
            requiredMark={false}
        >
            <Form.Item<FieldType>
                label="nombre"
                name="name"
                rules={[{ required: true, message: 'El nombre del producto es requerido' }]}

            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="descripción"
                name="description"
                rules={[{ required: true, message: 'La descripcion del producto es requerido' }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType='submit'>
                    {buttonTitle}
                </Button>
            </Form.Item>
        </Form>

    )
}

export default ProductForm