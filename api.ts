import toast from "react-hot-toast";

//const API_BASE_URL = 'https://apiappprospectos-production.up.railway.app'; // Base URL de la API
const API_BASE_URL = 'http://localhost:3003'; // Base URL de la API Dev

// Función genérica para hacer fetch
export async function apiFetch(endpoint: string, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      // Otros headers comunes pueden ir aquí (ej. autenticación)
    },
    ...options // Permite sobrescribir las opciones por defecto
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Ocurrió un error")
    console.error('Fetch error:', error);
    throw error;
  }
}
