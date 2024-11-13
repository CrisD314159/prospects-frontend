import EditUserForm from "@/app/ui/EditUserForm/EditUserForm"; // Asegúrate de que esta ruta sea correcta
import './styles.css';
import { apiFetch } from "@/api";

export default async function EditUser({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log({id})
  const response = await apiFetch(`/assessors/${id}`, { method: 'GET', cache: "no-store" });
  console.log(response)

  const user: User = await response;
  async function sendEditData(data: any) {
    'use server'
    const userData = {
      nombre: data.nombre,
      email: data.email,
      username: data.username,
      telefono: data.telefono
    };

    const response = await apiFetch(`/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if (response && response.message === 'Usuario creado') {
      return true;
    } else {
      //console.error("Error del backend:", response.message);
      return response.message || false;
    }
    return response.ok;
  }

  return (
    <div className="main-edit-containers">
      <div className="edit-title-container">
        <h1 className="edit-title">Editar Usuario</h1>
      </div>
      <EditUserForm user={user} sendEditData={sendEditData} />
    </div>
  );
}
