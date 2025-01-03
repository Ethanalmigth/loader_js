import { fetchdata } from "./function/fetch.js"
import { loader } from "./class/Loader.js"
const commentaires= fetchdata(document.querySelector(".js-infinite-pagination").dataset.endpoint)
commentaires.then((data)=>{
    const l= new loader(document.querySelector(".js-infinite-pagination"),data)
    
})





