var container = document.getElementById("container");
var grid = document.getElementById("grid");

function display(data) {
    data.forEach(item => { //arrow function style
        let card = document.createElement("div");
        let img = document.createElement("img");
        let name = document.createElement("a");

        card.className = "card";
        img.src = item.image;
        name.appendChild(document.createTextNode(item.name));
        name.href = `/${item.href}`

        card.appendChild(img);
        card.appendChild(name);
        grid.appendChild(card);
    });
}

fetch('foods.json')
    .then(response => response.json())
    .then(data => display(data))
    .catch(error => console.log('error', error))