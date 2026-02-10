var scriptTag = document.getElementById("script");
var food = scriptTag.dataset.food;
var container = document.getElementById("container");



function display(data) {
    data.forEach((item) => {
        if (item.href === food) {
            document.getElementById("title").innerHTML = item.name;

            let name = document.createElement("h1");
            let mainDiv = document.createElement("div");
            let imgDiv = document.createElement("div");
            let img = document.createElement("img");
            let listDiv = document.createElement("div");
            let ingredientHead = document.createElement("p");
            let ingList = document.createElement("ul");
            let nutritionHead = document.createElement("p");
            let nutriList = document.createElement("ul");
            let avalHead = document.createElement("p");
            let avalList = document.createElement("ul");
            let home = document.createElement("a");

            name.innerHTML = item.name;
            mainDiv.id = "mainDiv"
            imgDiv.id = "imgDiv";
            img.src = item.image;
            ingredientHead.innerHTML = "Ingredients:"
            nutritionHead.innerHTML = "Nutrition Facts:"
            avalHead.innerHTML = "Availability:"

            item.ingredients.forEach((ing) => {
                let list = document.createElement("li");
                list.innerHTML = ing;
                ingList.appendChild(list);
            });
            Object.entries(item.nutrition).forEach(([key, value]) => {
                let list = document.createElement("li");
                list.innerHTML = key + ": " + value;
                nutriList.appendChild(list);
            });
            item.regionAvailable.forEach((region) => {
                let list = document.createElement("li");
                list.innerHTML = region;
                avalList.appendChild(list);
            });

            home.innerHTML = "Back to home";
            home.href = "/";

            listDiv.appendChild(ingredientHead);
            listDiv.appendChild(ingList);
            listDiv.appendChild(nutritionHead);
            listDiv.appendChild(nutriList);
            listDiv.appendChild(avalHead);
            listDiv.appendChild(avalList);
            imgDiv.appendChild(img);
            mainDiv.appendChild(imgDiv);
            mainDiv.appendChild(listDiv);

            container.appendChild(name);
            container.appendChild(mainDiv);
            container.appendChild(home);
        }
    });
}

fetch('foods.json')
    .then(response => response.json())
    .then(data => display(data))
    .catch(error => console.log('error', error))