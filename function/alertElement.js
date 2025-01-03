/**
 * 
 * @param {string} message 
 */
export function alertElement(message){
    const alert = document.querySelector('#alert').content.cloneNode(true)
    alert.querySelector('.js-text').textContent = message
    alert.querySelector('button').addEventlistener("click",e=>{
        e.preventDefault()
        alert.remove()
    })
    return alert
}