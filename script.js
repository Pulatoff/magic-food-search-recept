const body = document.querySelector(".grid")
const form = document.querySelector('form')
const input = document.querySelector('input')
const bod = document.querySelector('.body')

function renderHtml(obj){
    let html = `
<div class="container">
    <img src="${obj.strMealThumb}" alt="" class="img">
    <h1 class="name__food">${obj.strMeal}</h1>

    <button class="${obj.strMeal}" >рецепт</button>
</div>`
body.insertAdjacentHTML("beforeend",html)
}

function renderHtmlresept(obj){
    let html = `
    <div class="instruct-box hidden" id="${obj.strMeal}">
        <div class="instruct">
            <p class="closeBtn">X</p>
         ${obj.strInstructions}
        </div>
     </div>`
     body.insertAdjacentHTML("afterend",html)
}

function errorXabar(response, nameFood){
    if (!(response.ok)) throw new Error(`${nameFood} nomli ovqat yuq`)
}

function resept(nameFood){
    fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameFood}`).then(response=>{
    errorXabar(response,nameFood)
    console.log(response)
    return response.json()
})
.then(res => {
    let food = res.meals
    console.log(food)
    food.forEach(element => {
        renderHtml(element)
        renderHtmlresept(element)
    });
}).catch(function(error){
    alert(error)
})
}


form.addEventListener('submit',function(e){
    e.preventDefault()
    body.innerHTML = ''
    resept(input.value)
})

body.addEventListener('click',function(e){
    let id = e.target.className
console.log(id)
let hid = document.querySelector(`#${id}`)
hid.classList.remove('hidden')


hid.addEventListener('click',function(e){
    if(e.target.classList == 'closeBtn'){
        hid.classList.add('hidden')
    }
})
})

