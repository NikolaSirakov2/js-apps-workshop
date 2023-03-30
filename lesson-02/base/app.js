let test = fetch(`http://localhost:3030/jsonstore/cookbook/recipes`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let article = document.getElementById("preview");
        

        console.log(data['03']);

        for(let i = 1; i < 4; i++){
            let container = document.createElement("div");

            let div = document.createElement("div");
            div.id = "title";
            let div2 = document.createElement("div");
            div2.id = "small";

            let title = document.createElement("h2");
            let image = document.createElement("img");
            
            title.innerText = data[`0${i}`].name;
            image.src = data[`0${i}`].img;

            div.appendChild(title);
            div2.appendChild(image);

            article.append(div, div2);

        }
    })
