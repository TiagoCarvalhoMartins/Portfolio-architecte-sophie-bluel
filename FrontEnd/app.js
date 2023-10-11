// Définition de l'URL de l'API
const worksURL = 'http://localhost:5678/api/works';
const categoriesURL = 'http://localhost:5678/api/categories';

// Utilisation de la méthode fetch pour récupérer les données de l'API
async function getWorks() {
  let response = await fetch(worksURL)
  let myJSON = await response.json();
     
  return (myJSON)
}

async function getCategories() {
  let response = await fetch(categoriesURL)
  let myJSON = await response.json();
     
  return (myJSON)
}

async function displayGallery (worksData) {
  for (i = 0; i < worksData.length; i++) {
      document.querySelector(".gallery").innerHTML +=   `<figure>
                                                          <img src="${worksData[i].imageUrl}" alt="${worksData[i].title}" id=${worksData[i].id}>
                                                          <figcaption>${worksData[i].title}</figcaption>
                                                      </figure>`
  }
}

async function displayFilters (categoriesData) {
  for (i = 0; i < categoriesData.length; i++) {
      document.querySelector(".filterButtons").innerHTML +=   `<button class="filterButton" name="${categoriesData[i].id}">
                                                                <span class="textButton">${categoriesData[i].name}</span>
                                                              </button>`
  }
}

async function filterButton(worksData) {
  let filteredWorks = []
  let boutons = document.querySelectorAll(".filterButton");
    boutons.forEach(bouton => {
      let name = bouton.getAttribute("name")
      bouton.addEventListener("click", function() {
        filteredWorks = []
        if (name === "all") {
          document.querySelector(".gallery").innerHTML = "";
          displayGallery(worksData);
        } else {
        for (let i = 0; i < worksData.length; i++) {

          if (worksData[i].category.id == name) {
            filteredWorks.push(worksData[i]);
          };
        }
        console.log("Objets correspondants :", filteredWorks);
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
}

init();

  

  