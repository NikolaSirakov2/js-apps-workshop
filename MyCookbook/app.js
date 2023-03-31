class ViewController {
  constructor() {
    window.addEventListener("load", this.handleHashChange);
    window.addEventListener("hashchange", this.handleHashChange);
  }

  handleHashChange = (e) => {
    const hash = location.hash.slice(1) || PAGE_IDS[0];

    // if (!PAGE_IDS.includes(hash)) {
    //   location.hash = "error";
    //   return;
    // }

    PAGE_IDS.forEach((pageId) => {
      let element = document.getElementById(pageId);
      if (hash === pageId) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });

    switch (hash) {
      case "recepies":
        this.renderRecepiesListPage();
        break;
      case "details":
        this.renderDetailsPage();
        break;
    }
  };

  renderRecepiesListPage = () => {
    let test = fetch(`http://localhost:3030/jsonstore/cookbook/recipes`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let article = document.getElementById("recepiesList");
        article.innerHTML = "";

        Object.values(data).forEach((recepie) => {
          let card = document.createElement("div");

          card.innerHTML = `<div class="card" style="width: 18rem;">
            <img src="${recepie.img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${recepie.name}</h5>
              
            </div>
          </div>`;

          let detailsBtn = document.createElement("a");
          detailsBtn.classList.add("btn", "btn-primary");
          detailsBtn.innerText = "Details";

          detailsBtn.onclick = (e) => {
            e.preventDefault();

            location.hash = "details";

            this.renderDetailsPage(recepie._id);
          };

          card.appendChild(detailsBtn);

          article.append(card);
        });
      });
  };

  renderDetailsPage = (id) => {
    let details = fetch(
      `http://localhost:3030/jsonstore/cookbook/details/${id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let article = document.getElementById("detailsContainer");
        article.innerHTML = "";

        
          let card = document.createElement("div");
          // card.style.background = "tomato";

          card.innerHTML = `<div class="card" style="width: 38rem;">
                    
                    <div class="card-body">
                    <img src="${data.img}" class="card-img-top" alt="...">
                    <h2 class="card-title">Ingredients:</h2>
                      <h5 class="card-title">${data.ingredients[0]}</h5>
                      <h5 class="card-title">${data.ingredients[1]}</h5>
                      <h5 class="card-title">${data.ingredients[2]}</h5>
                    </div>
                    <div class="card-body">
                    <h2 class="card-title">Preparation:</h2>
                      <h5 class="card-title">${data.steps[0]}</h5>
                      <h5 class="card-title">${data.steps[1]}</h5>
                      <h5 class="card-title">${data.steps[2]}</h5>
                    </div>
                  </div>`;

          

          article.append(card);
        
      });
  };
}

let viewController = new ViewController();
