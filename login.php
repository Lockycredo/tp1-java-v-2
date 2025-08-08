<?php
session_start();
error_reporting(E_ALL);
ini_set("display_errors", 1);

// Connexion à la base de données
$conn = new mysqli("localhost", "root", "", "mon_site");
if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}

// Traitement du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    // Vérifier si l'utilisateur existe
    $stmt = $conn->prepare("SELECT nom, prenom, mot_de_passe FROM utilisateurs WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($nom, $prenom, $hashed_password);
        $stmt->fetch();

        // Vérification du mot de passe
        if (password_verify($password, $hashed_password)) {
            echo "<h2>Rebonjour, $prenom $nom !!!</h2>";
        } else {
            echo "Mot de passe incorrect.";
        }
    } else {
        echo "Aucun utilisateur trouvé avec cet email.";
    }

    $stmt->close();
    $conn->close();
}
?>


