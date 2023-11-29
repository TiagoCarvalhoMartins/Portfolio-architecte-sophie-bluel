
// Le login renvoi vers une nouvelle page nommé login.html
const login = document.getElementsByClassName("login");

for (let i = 0; i < login.length; i++) {
  login[i].addEventListener("click", function() {
    const loginPage = "login.html";
    window.location.href = loginPage;
  });
}

// login.addEventListener("click", function() {
//   const loginPage = "login.html";
//   window.location.href = loginPage;
// });


// ajoute un template au DOM de chaque work sous forme d'images et leurs titres
async function displayGallery (worksData) {
  for (i = 0; i < worksData.length; i++) {
      document.querySelector(".gallery").innerHTML +=   `<figure>
                                                          <img src="${worksData[i].imageUrl}" alt="${worksData[i].title}" id=${worksData[i].id}>
                                                          <figcaption>${worksData[i].title}</figcaption>
                                                      </figure>`
  }
}

// ajoute un template au DOM de chaque catégorie sous forme de boutons
async function displayFilters (categoriesData) {
  for (i = 0; i < categoriesData.length; i++) {
      document.querySelector(".filterButtons").innerHTML +=   `<button class="filterButton" name="${categoriesData[i].id}">
                                                                <span class="textButton">${categoriesData[i].name}</span>
                                                              </button>`
  }
}

async function filterButton(worksData) {

  // initialise un tableau qui va nous servir à stocker des éléments filtrés
  let filteredWorks = []

  // Récupère les différents boutons puis pour chaque un d'eux récupère son attribut name qui est lié à l'id de la catégorie
  let boutons = document.querySelectorAll(".filterButton");
    boutons.forEach(bouton => {
      let name = bouton.getAttribute("name")
      bouton.addEventListener("click", function() {

      // Vide le tableau de filteredWorks avant d'y push des choses et retire la class "active" de tous les boutons
        filteredWorks = []
        for (let i = 0; i < boutons.length; i++) {
          boutons[i].classList.remove("active");
        }
  
      // Si le name dans le bouton vaut "all" afficher le tableau de tous les médias worksData
        if (name === "all") {
          document.querySelector(".gallery").innerHTML = "";;
          this.classList.add("active")
          displayGallery(worksData);
        } else {
  
      const filteredWorks = worksData.filter(function(work){
      return work.category.id == name;
      });

      this.classList.add("active")
      console.log("Objets correspondants :", filteredWorks);

      // Vide le html contenue dans "gallery" pour ne pas ajouter les éléments les uns à la suite des autres puis afficher les éléments triés
        document.querySelector(".gallery").innerHTML = "";
        displayGallery(filteredWorks);

      }})   
   })
}

async function init () {
  const worksData = await getWorks();
  const categoriesData = await getCategories();
  displayFilters (categoriesData)
  displayGallery (worksData)
  filterButton(worksData)
  verificationToken()
  logout()
  adminImages(worksData)
  deleteImages(trashIcons)
}

init();

  

  