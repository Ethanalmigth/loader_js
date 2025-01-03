export async function fetchJSON (url,options={}){
    const headers ={Accept:"application/json",...options}
    const r = await fetch(url,{...options,headers})
    if (!r.ok){
        throw new Error(`HTTP error! status: ${r.status}`)
    }
    return await r.json()

}