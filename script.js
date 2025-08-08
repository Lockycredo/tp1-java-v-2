// Fonction de validation du formulaire
function validateForm() {
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    
    clearErrorMessages();
    
    let isValid = true;
    
    
    if (nom.length < 2) {
        showError("nom", "Le nom doit contenir au moins 2 caractères");
        isValid = false;
    }
    
    
    if (prenom.length < 2) {
        showError("prenom", "Le prénom doit contenir au moins 2 caractères");
        isValid = false;
    }
    
    // Validation de l'email avec REgex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        showError("email", "Veuillez entrer une adresse email valide");
        isValid = false;
    }
    
    // Validation du mot de passe (minimum 8 caractères)
    if (password.length < 8) {
        showError("password", "Le mot de passe doit contenir au moins 8 caractères");
        isValid = false;
    }
    
  
    if (password !== confirmPassword) {
        showError("confirmPassword", "Les mots de passe ne correspondent pas");
        isValid = false;
    }
    
    return isValid;
}

// Fonction pour afficher les messages d'erreur
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.textContent = message;
    errorSpan.style.color = "#ff4444";
    errorSpan.style.fontSize = "0.8em";
    errorSpan.style.position = "absolute";
    errorSpan.style.top = "55px";
    errorSpan.style.left = "0";
    
    field.parentElement.style.position = "relative";
    field.parentElement.appendChild(errorSpan);
}


function clearErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(message => message.remove());
}

// Fonction pour afficher le message de succès
function showSuccess() {
    document.getElementById("main-section").classList.add("hidden");
    document.getElementById("loader").style.display = "block";
    

    setTimeout(() => {

        document.getElementById("loader").style.borderTopColor = "#00ff00";
        
    
        setTimeout(() => {
            // Masquer le loader et afficher le message de succès
            document.getElementById("loader").style.display = "none";
            document.getElementById("successMessage").style.display = "block";
            
            setTimeout(() => {
                document.getElementById("main-section").classList.remove("hidden");
                document.getElementById("successMessage").style.display = "none";
                document.getElementById("inscriptionForm").reset();
            }, 3000);
            
        }, 1500);
    }, 2000);
}

// Validation individuelle des champs en temps réel
function setupRealTimeValidation() {
    const fields = ["nom", "prenom", "email", "password", "confirmPassword"];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener("input", function() {
            const errorMessage = this.parentElement.querySelector(".error-message");
            if (errorMessage) {
                errorMessage.remove();
            }
            

            switch(fieldId) {
                case "nom":
                case "prenom":
                    if (this.value.trim().length >= 2) {
                        this.style.borderBottomColor = "#00ff00";
                    } else {
                        this.style.borderBottomColor = "rgba(255, 255, 255, 0.8)";
                    }
                    break;
                    
                case "email":
                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (emailRegex.test(this.value.trim())) {
                        this.style.borderBottomColor = "#00ff00";
                    } else {
                        this.style.borderBottomColor = "rgba(255, 255, 255, 0.8)";
                    }
                    break;
                    
                case "password":
                    if (this.value.length >= 8) {
                        this.style.borderBottomColor = "#00ff00";
                    } else {
                        this.style.borderBottomColor = "rgba(255, 255, 255, 0.8)";
                    }
                    break;
                    
                case "confirmPassword":
                    const password = document.getElementById("password").value;
                    if (this.value === password && password.length > 0) {
                        this.style.borderBottomColor = "#00ff00";
                    } else {
                        this.style.borderBottomColor = "rgba(255, 255, 255, 0.8)";
                    }
                    break;
            }
        });
    });
}

// Gestionnaire principal du formulaire
document.getElementById("inscriptionForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        showSuccess();
        const userData = {
            nom: document.getElementById("nom").value.trim(),
            prenom: document.getElementById("prenom").value.trim(),
            email: document.getElementById("email").value.trim(),
            dateInscription: new Date().toISOString()
        };
        console.log("Utilisateur inscrit:", userData);
    }
});


document.addEventListener("DOMContentLoaded", function() {
    setupRealTimeValidation();
});