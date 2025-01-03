
export async function fetchdata(url) {
    try{
        const reponse= await fetch(url)
        if(reponse.ok){
            const data = await reponse.json()
            return data
        }
    }
    catch{
        throw new Error("Nous n'avons pas charger les donnees")
    }

}