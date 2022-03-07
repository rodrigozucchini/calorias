
const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj)
  const attrs = []

  for(let i=0; i<keys.length; i++) {
    let attr = keys[i]
    attrs.push(`${attr}="${obj[attr]}"`)
  }
  const string = attrs.join('')

  return string
}

const tagAttrs = obj => (content = '') =>
  `<${obj.tag}${obj.attrs ? ' ' :	 ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`

const tag = t => {
  if(typeof t === 'string') {
    return tagAttrs({tag: t})
  } else {
    return tagAttrs(t)
  }
}

const tableRowTag = tag("tr");
const tableRow = (items) => tableRowTag(tableCells(items));


const tableCell = tag("td");
const tableCells = (items) => items.map(tableCell).join("");

const trashIcon = tag({tag: 'i', attrs: {class: 'fas fa-trash-alt'}})('+')

let description = document.getElementById("description");
let carbs = document.getElementById("carbs");
let calories = document.getElementById("calories"); 
let protein = document.getElementById("protein");

let list = [];

const validateInputs = () => {
       description.value ? '' : description.classList.add('is-invalid')
       carbs.value ? '' : carbs.classList.add('is-invalid')
       calories.value ? '' : calories.classList.add('is-invalid')
       protein.value ? '' : protein.classList.add('is-invalid')

       if(description.value && calories.value && carbs.value && protein.value) {
        add()
      }

      if(description.value !== '') {
        description.classList.remove('is-invalid')
      }
      if(carbs.value !== '') {
        carbs.classList.remove('is-invalid')
      }
      if(calories.value !== '') {
        calories.classList.remove('is-invalid')
      }
      if(protein.value !== '') {
        protein.classList.remove('is-invalid')
      }
    }

const add = () => {
    const newItem = {
        description: description.value,
        calories: parseInt(calories.value),
        carbs: parseInt(carbs.value),
        protein: parseInt(protein.value),
    }
    list.push(newItem)
    cleanInputs()
    updateTotals()
    renderItems()
} 

const updateTotals = () => {
  let calories = 0, carbs =0, protein =0

  list.map(item => {
    calories += item.calories,
    carbs += item.carbs,
    protein += item.protein
  })

  document.querySelector("#total-calories").textContent = calories
  document.querySelector("#total-carbs").textContent = carbs
  document.querySelector("#total-protein").textContent = protein
}

const cleanInputs = () => {
    description.value='',
    calories.value='',
    carbs.value='',
    protein.value=''
}

const renderItems = () => {
  
  const listWrapper = document.querySelector('tbody')

  listWrapper.innerHTML = ""  

  list.map((item, index) => {   
    
    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn-outline-danger',
        onclick: `removeItem(${index})`
      }
    })(trashIcon)

    listWrapper.innerHTML += tableRow([
			item.description, 
			item.calories, 
			item.carbs, 
			item.protein,
      removeButton
		])
  })
}

const removeItem = (index) => {
  list.splice(index,1)

    updateTotals()
    renderItems()
  }
