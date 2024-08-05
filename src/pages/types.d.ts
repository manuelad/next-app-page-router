export interface ProductDto {
    id: number
    name: string
    description: number
    updatedAt?: Date
    cretedAt?: Date
}

export type InitialState = {
    message: String,
    error: Boolean | null
}

export interface DataType {
    id: number
    name: String
    description: String,
    updatedAt: Date,
    createdAt: Date
}