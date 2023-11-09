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
const addPhotoWindow = document.getElementById("addPhoto")

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


const containerAddPhoto = document.getElementById("containerAddPhoto");

containerAddPhoto.addEventListener("dragover", function(event) {
    event.preventDefault();
    containerAddPhoto.classList.add("dragover");
});

containerAddPhoto.addEventListener("dragleave", function() {
    containerAddPhoto.classList.remove("dragover");
});

containerAddPhoto.addEventListener("drop", function(event) {
    event.preventDefault();
    containerAddPhoto.classList.remove("dragover");

    const files = event.dataTransfer.files;

    // Vérifier si des fichiers ont été déposés
    if (files.length > 0) {

        containerAddPhoto.innerHTML = '';
        // Vous pouvez accéder au premier fichier déposé (files[0])
        // Ici, nous allons simplement ajouter un élément img pour chaque fichier déposé
        for (const file of files) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                containerAddPhoto.appendChild(img);
                img.classList.add("photoToAdd")
            };

            reader.readAsDataURL(file);
        }
    }
});

const title = document.getElementById("title")
const titleValue = title.value;

const category = document.getElementById("category")
const categoryValue = category.value;

const buttonValid = document.getElementsByClassName("validationButton")[0]
let hasImage = false
let hasTitle = ""
let hasCategory = ""

title.addEventListener("input", function(){
    hasTitle = title.value;
    changeValidationButton()
});
category.addEventListener("input", async function(){
    let categoriesData = await getCategories();
    hasCategory = category.value;
    hasCategory = await findCategoryId(hasCategory, categoriesData);
    changeValidationButton();
});
containerAddPhoto.addEventListener("DOMNodeInserted", function() {
    const images = document.querySelectorAll(".photoToAdd");
    if (images.length>=0) {
        hasImage = true;
    }
    changeValidationButton()
});

async function changeValidationButton() {
    if (hasImage==true && hasTitle !== "" && hasCategory !== "") {
        buttonValid.classList.remove("notValide");
         buttonValid.classList.add("valide");
    } else {
        buttonValid.classList.remove("valide");
        buttonValid.classList.add("notValide");
    } 
}

async function findCategoryId(categoryName, categoriesData) {
    const foundCategory = categoriesData.find(category => category.name === categoryName);
    return foundCategory ? foundCategory.id : null;
}

const postValidate = document.getElementsByClassName("valide")


for (let i = 0; i < postValidate.length; i++) {
    postValidate[i].addEventListener("click", async function(){
            let worksData = await getWorks();
            const image = document.querySelectorAll(".photoToAdd")
            const imageURL = image[0].getAttribute('src')
            // const postData = {
            //     "id": worksData.length+1,
            //     "title": hasTitle,
            //     "imageUrl": imageURL,
            //     "categoryId": hasCategory,
            //     "userId": 1
            // };
            
            // const requestOptions = {
            //     method: 'POST',
            //     headers: {
            //     'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(postData)
            // };


                const formData = new FormData();
                formData.append("id", worksData.length + 1);
                formData.append("title", hasTitle);
                formData.append("categoryId", hasCategory);
                formData.append("userId", 1);
                formData.append("imageUrl", imageURL);

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                };

            // Effectue la requête POST
            fetch(worksURL, requestOptions)
            .then(response => response.json())
            .then(data => {
            console.log('Réponse de l\'API:', data);
            // Faites quelque chose avec la réponse de l'API ici
            })
            .catch(error => {
            console.error('Erreur lors de la requête POST:', error);
            // Gérez les erreurs ici
            });
        }
    )
}