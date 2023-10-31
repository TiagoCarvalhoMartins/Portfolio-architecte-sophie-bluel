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

const closeCross = document.getElementById("closeButton")
const background = document.getElementById("background")

closeCross.addEventListener("click", function() {
    editPage.style.display = 'none';
});

background.addEventListener("click", function() {
    editPage.style.display = 'none';
});

const trashIcons = document.getElementsByClassName("trashIcon")


async function deleteImages(trashIcons) {
    for (let i = 0; i < trashIcons.length; i++) {
        trashIcons[i].addEventListener("click", async function() {
            const dataId = this.getAttribute("data-id");

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
                if (response.status === 200) {
                    // Si la requête réussit (statut 200), vous pouvez supprimer l'élément du DOM.
                    location.reload();
                } else {
                    // Gérer les erreurs ou afficher un message d'erreur si la requête échoue.
                    console.error("La requête a échoué");
                }
            }
        }
    )}
}

