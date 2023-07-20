export interface ICategories {
    id:number,
    name:string,
    categories: [
        {
            catId:number,
            categoryName:string
        }
    ]
}
