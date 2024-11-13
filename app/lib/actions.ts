'use server'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { apiFetch } from '@/api';
import { setAdmin } from '../context/AuthContext'
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const adminData = await obtenerAdmin(formData);
    setAdmin(adminData);  // Actualizamos la variable admin
    console.log(adminData + ' actions');
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function obtenerAdmin( formData: FormData){
  const username = formData.get('username');
  if (typeof username !== 'string') {
    throw new Error('Username is required and must be a string.');
  }

  // Llamamos a la función que obtiene el usuario
  const admin = await getAdmin(username);
  return admin
}

async function getAdmin(username: string) {
  try {
    const result = await apiFetch(`/users/${username}`)
    const user = await result
    const isAdmin = user.esadministrador
    return isAdmin;
} catch (error) {
    throw new Error('Failed to fetch user.');
}
}