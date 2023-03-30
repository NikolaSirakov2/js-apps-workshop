let test = fetch(`http://localhost:3030/jsonstore/cookbook/recipes`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let article = document.getElementById("recepiesList");

    console.log(data["03"]);

    for (let i = 1; i < 4; i++) {
      let card = document.createElement("div");
      let image = data[`0${i}`].img;
      let name = data[`0${i}`].name;

      card.innerHTML = `<div class="card" style="width: 28rem;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <a href="#" class="btn btn-primary">Details</a>
            </div>
          </div>`;

      article.append(card);
    }
  });
