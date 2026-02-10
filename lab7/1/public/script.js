const scriptTag = document.getElementById("script");
const category = scriptTag.dataset.category; //dataset คือวิธีการ accesss data-*
var container = document.getElementById("container");

function display(data) {
    data.forEach(function (item) {
        if (item.category === category) {
            let div = document.createElement("div");
            let img = document.createElement("img");
            let name = document.createElement("h2");
            let price = document.createElement("p");

            div.className = "card";
            img.src = item.image;
            name.appendChild(document.createTextNode(item.name));
            price.appendChild(document.createTextNode(`Price: ${item.price}$`));

            div.appendChild(img);
            div.appendChild(name);
            div.appendChild(price);
            container.appendChild(div);
        }
    });
}

fetch('items.json')
    .then(response => response.json())
    .then(data => display(data))
    .catch(error => console.log('error', error))