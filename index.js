// import Handlebars from "./handlebars.js"
const xhr = new XMLHttpRequest();
const pass = "pass here";
let route;

document.onload = getRoute(); getRoute();

function getRoute() {
    if (window.location.port)
        route = document.URL.split(`${document.domain}:${window.location.port}`)[1];
    else
        route = document.URL.split(document.domain)[1];

    if (window.location.hash)
        route = route.split(window.location.hash)[0];
}

let routes = route.split("/");

if (routes.length == 2) {
    let f = `__pages/${routes[routes.length - 1]}.html`;
    xhr.open("HEAD", f);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200) {
            xhr.open("GET", f);
            xhr.onload = function() {
                let template = Handlebars.compile(xhr.responseText);
                document.body.innerHTML = xhr.responseText;
                let tmp = document.querySelector("#template").innerHTML;
                xhr.open("GET", `__templates/${tmp}`);
                xhr.onload = function() {
                    if (xhr.status == 200)
                        document.body.innerHTML =
                            template(JSON.parse(xhr.responseText));
                }; xhr.send();
            }; xhr.send();
        } else {
            xhr.open("GET", "__pages/<>.html");
            xhr.onload = function() {
                let template = Handlebars.compile(xhr.responseText);
                document.body.innerHTML = xhr.responseText;
                let tmp = document.querySelector("#template").innerHTML;
                xhr.open("GET", `__templates/${tmp}`);
                xhr.onload = function() {
                    if (xhr.status == 200) {
                        tmp = JSON.parse(xhr.responseText);
                        tmp["route"] = routes[routes.length - 1];
                        document.body.innerHTML = template(tmp);
                }}
            }
    }}
} else {
    // `/a/b` şeklinde giden adresler ve `/a/<b>` şeklinde giden adresler için
}

