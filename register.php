<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
$conn = new mysqli("localhost", "root", "", "mon_site");
if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = trim($_POST["nom"]);
    $prenom = trim($_POST["prenom"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];
    if ($password !== $confirm_password) {
        echo "Les mots de passe ne correspondent pas.";
        exit();
    }
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nom, $prenom, $email, $hashed_password);

    if ($stmt->execute()) {
    echo '<!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>Inscription réussie</title>
        <link rel="stylesheet" href="style.css"> <!-- si tu as un fichier CSS -->
    </head>
    <body>
    <body>
    <div id="main-section" class="hidden"></div>
    <form id="inscriptionForm"></form>

    <div class="loader" id="loader"></div>
    <div class="success-message" id="successMessage">
        ✅ Inscription réussie ! Bienvenue !
    </div>

    <script src="script.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            showSuccess();
        });
    </script>
</body>


        

    </body>
    </html>'; 
    } else {
        echo "Erreur lors de l'inscription : " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
