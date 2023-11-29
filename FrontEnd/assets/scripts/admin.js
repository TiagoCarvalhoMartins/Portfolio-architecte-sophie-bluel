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

const token = window.sessionStorage.getItem("identifiant")
let logoutElements = []

async function logoutGestion () {

    let login = document.getElementsByClassName("login");
    Array.from(login).forEach(function(element) {
        element.innerHTML = "logout";
        element.classList.add("logout");
        element.classList.remove("login");
      });
}

async function verificationToken (){

    if (token === undefined || token === null) {
    console.log("Le token est undefined ou null.")

    } else {
        console.log(token)
        const editElement = document.getElementById("editButton");
        editElement.style.display = 'flex'; 
        logoutGestion();      
        logoutElements = document.getElementsByClassName("logout");
    }
}

async function logout() {
    for (let i = 0; i < logoutElements.length; i++) {
        logoutElements[i].addEventListener("click", function() {
            sessionStorage.removeItem("identifiant");
            location.reload(); // Recharge la page
        });
    }
}

const editPage = document.getElementById("editPage");

const edit = document.getElementById("editButton");
edit.addEventListener("click", function() {
    editPage.style.display = 'flex';
});

async function adminImages (worksData) {
    for (i = 0; i < worksData.length; i++) {
        document.querySelector(".containerPhotosAdmin").innerHTML +=   `<div class="containerPhoto">
                                                                            <img src="${worksData[i].imageUrl}" alt="${worksData[i].title} data-id=${worksData[i].id}">
                                                                            <button class="trashIcon fa-solid fa-trash-can" data-id=${worksData[i].id}></button>
                                                                        </div>`
    }
}

const closeCrosses = document.getElementsByClassName("closeButton")
const background = document.getElementById("background")
const addPhotoWindow = document.getElementById("modal2")

for (let i = 0; i < closeCrosses.length; i++) {
    closeCrosses[i].addEventListener("click", function() {
        editPage.style.display = 'none';
        addPhotoWindow.style.display = 'none';
    })
}


background.addEventListener("click", function() {
    editPage.style.display = 'none';
    addPhotoWindow.style.display = 'none';
});

const trashIcons = document.getElementsByClassName("trashIcon")
let dataId = ""



async function deleteImages(trashIcons) {
    for (let i = 0; i < trashIcons.length; i++) {
        trashIcons[i].addEventListener("click", async function(event) {
            dataId = this.getAttribute("data-id");

            // Demander une confirmation à l'utilisateur
            const userConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
            if (userConfirmed) {
                const headers = new Headers();
                headers.append("Authorization", `Bearer ${token}`);
                // Faites ici votre requête à l'API avec l'ID
                const requestOptions = {
                    method: "DELETE",
                    headers: headers
                };
                const response = await fetch(`http://localhost:5678/api/works/${dataId}`, requestOptions);    
                if (response.ok) {
                    // Si la requête réussit (statut 200), vous pouvez supprimer l'élément du DOM.
                    //event.preventDefault()
                    document.getElementById(dataId).innerHTML=""
                    // const elementsToDelete = document.querySelectorAll(`[data-id="${dataId}"]`);
                    // elementsToDelete.parentElement.remove
                } else {
                    // Gérer les erreurs ou afficher un message d'erreur si la requête échoue.
                    console.error("La requête a échoué");
                }
            }
        }
    )}
}

const addWindowButton = document.getElementById("addWindow")

addWindowButton.addEventListener("click", function() {
    editPage.style.display = 'none';
    addPhotoWindow.style.display = 'flex';
});

const previousButton = document.getElementById("previousButton")

previousButton.addEventListener("click", function() {
    editPage.style.display = 'flex';
    addPhotoWindow.style.display = 'none';
});

const fileInput = document.getElementById("photoToAdd");
const addPhotoButton = document.getElementById("addPhotoButton");

addPhotoButton.addEventListener("click", function() {
    fileInput.click();
});

// Fonction pour afficher une preview de l'image uploadée //

const imageInput = document.querySelector("#photo");
const submitButton = document.querySelector("#ajout_photo");
const imgAndSpec = document.querySelector("#img_and_spec");
const imgBackground = document.getElementById('img_background');
const previewImg = document.createElement('img');                   // Création de la balise img avec l'id "preview" //
previewImg.id = 'preview';

imgBackground.appendChild(previewImg);

const previewImage = document.querySelector("#preview");

imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();                // Lecture de l'image uploadée et affichage d'une miniature de celle ci //
    reader.addEventListener("load", function () {
      previewImage.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});


// Envoi de l'image uploadée à l'API et mise à jour de la page du site + modale d'édition //

const addButton = document.querySelector("#ajout_photo");

addButton.addEventListener("click", function () {
  const imageInput = document.querySelector("#photo");
  const titleInput = document.querySelector("#title_input");
  const categorySelect = document.querySelector("#category_select");
  const formData = new FormData();

  if (!imageInput.files[0]) {
    alert("Veuillez sélectionner une photo.");
    return;
  }

  if (!titleInput.value) {
    alert("Veuillez saisir un titre.");
    return;
  }

  if (categorySelect.value == 0) {
    alert("Veuillez saisir une catégorie.");
    return;
  }

  formData.append("image", imageInput.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", categorySelect.value);


  fetch('http://localhost:5678/api/works', {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
});