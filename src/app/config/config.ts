export const pathLinks = {
    globalUrl : "assets/data/",
    jsonString: ".json"
}

export const getLocalStorage = (itemName:string) :any =>{
    var item = localStorage.getItem(itemName);
    if (item !== null) {
      return JSON.parse(item)
    }
    return null
}
export const setLocalStorage = (itemName:string, object:any) : any=>{
    return localStorage.setItem(itemName, JSON.stringify(object))
}
