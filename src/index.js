let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });    

});

function addToyCard(toy) {

  const toyCollection = document.getElementById('toy-collection');

  const div = document.createElement('div');
  div.className = "card"

  toyCollection.appendChild(div);

  const h2 = document.createElement('h2');
  h2.textContent = toy.name;
  div.appendChild(h2);

  const image = document.createElement('img');
  image.className = "toy-avatar";
  image.src = toy.image;
  div.appendChild(image);

  const likeCount = document.createElement('p');
  likeCount.textContent = toy.likes + " likes";
  div.appendChild(likeCount);

  const btn = document.createElement('button');
  btn.className = "like-btn";
  btn.id = toy.id;
  btn.textContent = 'Like Me!';
  div.appendChild(btn);

  btn.addEventListener('click', (e) => {
    likeCount.textContent = (toy.likes+= 1) + " likes";
    fetch(`http://localhost:3000/toys/${toy.id}`, {
    method:'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({likes: toy.likes})
    })
    .then (res => res.json())
    .then (toy => {
        console.log("Like count should be updated!");
        likeCount.textContent = toy.likes + " likes";
    })
    
  })
}

function fetchToys() {
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toysData => addToyCards(toysData))
    }

function addToyCards(toys) {
  toys.forEach(addToyCard)
}

fetchToys();

const toyForm = document.getElementById('toy-form');

toyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const toy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }

fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'},
    body: JSON.stringify(toy)
})
.then (res => res.json())
.then (toy => {
  addToyCard(toy)
  e.target.reset();
})
})


