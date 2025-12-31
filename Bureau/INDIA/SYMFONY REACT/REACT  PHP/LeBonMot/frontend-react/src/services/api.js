// src/services/api.js
const API_URL = "http://localhost/backend-php/public/api";

// ✅ GET: récupérer la liste des posts depuis PHP
export async function getPosts() {
  const res = await fetch(`${API_URL}/posts.php`);

  if (!res.ok) {
    throw new Error(`Erreur API (${res.status})`);
  }

  return res.json();
}
