import { templateCreate } from "../function/templateCreate.js"
import { fetchdata } from "../function/fetch.js"
export class loader{
    #endpoint
    #template
    #target
    #elements
    #observer
    /**
     * @param {HTMLElement} elements 
     */
    constructor(elements,data){
        //this.#endpoint = elements.dataset.endpoint;
        this.#template = templateCreate(document.querySelector(elements.dataset.template));
        console.log(this.#template)
        this.#target = document.querySelector(elements.dataset.target);
        console.log(this.#target)
        this.#elements= JSON.parse(elements.dataset.elements);
        console.log(this.#elements)
        this.#observer = new IntersectionObserver((entries)=>{
            for(const entry of entries){
                if(entry.isIntersecting){
                   for(let i of data){
                   const a= this.#createcomment(i);
                   this.#target.appendChild(a);
                   }
                }
            }
        });
        this.#observer.observe(elements)
    }

    #createcomment(d){
        const article= this.#template.firstElementChild.cloneNode(true)
        for(let i in this.#elements){
           article.querySelector(this.#elements[i]).innerText=d[i]
        }
        return article
        
    }
}