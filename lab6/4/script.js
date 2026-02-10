var input = document.getElementById("inputBox");
var container = document.getElementById("container");
var movieList = document.getElementById("movie-list");

if (localStorage.getItem('storage') === null) {
    var movieArr = [];
} else {
    var movieArr = JSON.parse(localStorage.getItem('storage'));
}

display();


function display() {
    //occur when page starts
    while (movieList.firstChild) {
        movieList.removeChild(movieList.firstChild);
    }

    if (movieArr.length === 0) {
        let div = document.createElement("div");
        let name = document.createElement("p");

        div.className = "dataBox"

        name.appendChild(document.createTextNode("ยังไม่มีรายการโปรด"));

        div.appendChild(name);
        movieList.appendChild(div);

    } else {
        movieArr.forEach(function (data, index) {
        let div = document.createElement("div");
        let name = document.createElement("p");
        let button = document.createElement("button");

        button.className = "itemRemove"
        button.onclick = function () { //anonymous function ที่จะไปเรียก removeMovie(index) อีกทีเมื่อกด
            removeMovie(index);
        };
        div.className = "dataBox"

        name.appendChild(document.createTextNode(data));
        button.appendChild(document.createTextNode("ลบ"));

        div.appendChild(name);
        div.appendChild(button);
        movieList.appendChild(div);
        });
    }

}

function add() {
    movieArr.push("🎬" + input.value);
    localStorage.setItem('storage', JSON.stringify(movieArr));
    alert("Added new movie/serie!");
}

function removeMovie(index) {
    //splice(startIndex, numbers of element to be deleted start from start index, item1, item2, ... [after deletion]);
    movieArr.splice(index, 1);
    localStorage.setItem('storage', JSON.stringify(movieArr));
    display();
    alert("Remove element at order " + (index+1));
}

function clearMovie() {
    localStorage.clear();
    while (movieList.firstChild) {
        movieList.removeChild(movieList.firstChild);
    }
    movieArr = [];
    display();
    alert("Clear all data!");
}

//JSON.stringify(obj, array) convert from Object, Array -> String
//JSON.parse(string) converts from String -> Object, Array