<?php
// ----- bootstrap minimal -----
require_once __DIR__ . '/actions/signupAction.php'; // ou loginAction.php selon ton cas
// $errorMsg éventuellement défini par ton action ci-dessus

// Exemple de gestion locale (si tu veux traiter ici) :
// if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['validate'])) { ... }
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>StockageFile - Connexion</title>

    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="font-sans text-gray-900 antialiased bg-[#f8f4f3]">
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div>
            <a href="/">
                <h2 class="font-bold text-3xl">
                    Stockage<span class="bg-[#f84525] text-white px-2 rounded-md">File</span>
                </h2>
            </a>
        </div>

        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <!-- Formulaire: POST sur la meme page -->
            <form method="POST" action="" class="container" autocomplete="on">
                <div class="py-2 text-center">
                    <span class="text-2xl font-semibold">Connexion</span>
                </div>

                <?php if (!empty($errorMsg)): ?>
                    <div class="text-red-500 text-sm mb-4"><?= htmlspecialchars($errorMsg) ?></div>
                <?php endif; ?>

                <!-- Pseudo -->
                <div class="mt-4">
                    <label for="pseudo" class="block font-medium text-sm text-gray-700">Pseudo</label>
                    <input type="text" id="pseudo" name="pseudo" placeholder="Entrez votre pseudo" required
                        class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]" />
                </div>

                <!-- Mot de passe -->
                <div class="mt-4">
                    <label for="password" class="block font-medium text-sm text-gray-700">Mot de passe</label>
                    <div class="relative">
                        <input id="password" type="password" name="password" placeholder="Entrez votre mot de passe"
                            required autocomplete="current-password"
                            class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525] pr-10" />
                        <button type="button" id="togglePassword"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
                            aria-label="Afficher/Masquer le mot de passe">
                            <!-- icône oeil simple -->
                            <i class='bx bx-show text-xl'></i>
                        </button>
                    </div>
                </div>

                <!-- Remember me -->
                <div class="block mt-4">
                    <label for="remember_me" class="flex items-center gap-2">
                        <input type="checkbox" id="remember_me" name="remember"
                            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" />
                        <span class="text-sm text-gray-600">Se souvenir de moi</span>
                    </label>
                </div>

                <div class="flex items-center justify-between mt-6">
                    <!-- Lien "mot de passe oublié" en PHP procédural -->
                    <a class="hover:underline text-sm text-gray-600 hover:text-gray-900" href="/forgot.php">Mot de passe
                        oublié ?</a>

                    <button
                        class="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-red-900 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        type="submit" name="validate" value="1">
                        Connexion
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // Afficher/masquer le mot de passe
        const passwordInput = document.getElementById('password');
        const togglePasswordButton = document.getElementById('togglePassword');
        togglePasswordButton.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            togglePasswordButton.firstElementChild.className = isPassword ? 'bx bx-hide text-xl' : 'bx bx-show text-xl';
        });
    </script>
</body>

</html>