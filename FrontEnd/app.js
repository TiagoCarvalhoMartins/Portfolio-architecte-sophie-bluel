// Définition de l'URL de l'API
const worksURL = 'http://localhost:5678/api/works';

// Utilisation de la méthode fetch pour récupérer les données de l'API
fetch(worksURL)
  .then(response => {
    // Transformation de la réponse en objet JSON
    return response.json();
  })
  .then(worksData => {
    // Utilisation des données récupérées
    console.log('Données récupérées depuis l\'API :', worksData);
    for (i = 0; i < worksData.length; i++) {
        document.querySelector(".gallery").innerHTML +=   `<figure>
                                                            <img src="${worksData[i].imageUrl}" alt="${worksData[i].title}" id=${worksData[i].id}>
                                                            <figcaption>${worksData[i].title}</figcaption>
                                                        </figure>`
    }
  })
  

  