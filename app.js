import { alertElement } from "./function/alertElement.js"
import { fetchJSON } from "./function/api.js"
class InfinitePagination{

    /**@type {string} */
    #endpoint
    /** @type {HTMLTemplateElement}*/
    #template
    /** @type {HTMLElement}*/
    #target
    /** @type {object}*/
    #elements
    /** @type {IntersectionObserver}*/
    #observer
    /**@type {boolean} */
    #loading= false
    /**@type {number} */
    #page=1
     /** @type {HTMLElement}*/
     #loader
    
    constructor(element){
        this.#loader=element
        this.#endpoint =element.dataset.endpoint
        this.#template = document.querySelector(element.dataset.template)
        this.#target =document.querySelector(element.dataset.target)
        this.#elements =JSON.parse(element.dataset.elements)
        this.#observer= new IntersectionObserver((entries)=>{
            for(let entry of entries ){
                if(entry.isIntersecting){
                    this.#loadMore()
                }
            }
        })
        console.log("Hello",this.#target)
        this.#observer.observe(element)
        
        
    }
    async #loadMore(){
        if(this.#loading){
            return
        }
        try{
            this.#loading=true
            const url = new URL(this.#endpoint)
            url.searchParams.set("page",this.#page)
            const comments =await fetchJSON(url.toString())
            if(comments.length===0){
                this.#observer.disconnect()
                this.#loader.remove()
                return
            }
            for(const comment of comments){
                const commentElement = this.#template.content.cloneNode(true)
                for(const [key,selector] of Object.entries(this.#elements)){
                    const element =commentElement.querySelector(selector)
                    element.textContent = comment[key]
                }
                console.log(this.#elements)
                this.#target.append(commentElement)
            }
            this.#page++
            this.#loading=false  
        }catch(e){
            this.#target.append(alertElement("Erreur serveurs impossible de charger les contenus"))
            this.#observer.disconnect()
            this.#loader.remove()
        }
        
    }
}

document
.querySelectorAll(".js-infinite-pagination")
.forEach(el=> new InfinitePagination(el))