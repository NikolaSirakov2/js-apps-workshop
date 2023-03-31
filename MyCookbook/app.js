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

        Object.values(data).forEach((recepie) => {
          console.log(recepie._id);

          let card = document.createElement("div");

          card.innerHTML = `<div class="card" style="width: 28rem;">
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
            console.log(5);
            location.hash = "details";
            this.renderDetailsPage(recepie._id);
          };

          card.appendChild(detailsBtn);

          article.append(card);
        });
      });
  };

  renderDetailsPage = (id) => {};
}

let viewController = new ViewController();
