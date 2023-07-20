export interface IProduct {
    id: number,
    name: string,
    price:{
        noDis: number,
        discount: number | null
    },
    description: string,
    img:{
        src: string,
        alt:string
    },
    brand: string,
    categories: number,
    subCategories: []
}