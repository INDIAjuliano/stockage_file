<?php
require 'actions/database.php'; 
if (isset($_POST['validate'])) {
    $pseudo = htmlspecialchars($_POST['pseudo']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    
    if (!empty($pseudo) && !empty($password)) {
        $stmt = $bdd->prepare("INSERT INTO users (pseudo, password) VALUES (?, ?)");
        $stmt->execute([$pseudo, $password]);
        echo "Inscription réussie !";
    } else {
        // echo "Veuillez remplir tous les champs.";
        $errorMsg = "Veuillez remplir tous les champs.";
    }
}