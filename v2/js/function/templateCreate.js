export function templateCreate(elements){
    if(elements){
        return elements.content.cloneNode(true)
    }
    throw new Error("L'elements n'existe pas")
    
}

