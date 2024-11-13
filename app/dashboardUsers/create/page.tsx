import CreateUserForm from '@/app/ui/CreateUserForm/CreateUserForm';
import './styles.css'
import { apiFetch } from '@/api';
import { Password } from '@mui/icons-material';
import bcrypt from 'bcrypt';

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function CreateUser() {
  async function sendUserData(data: any) { // Cambia 'User' a 'any' si 'User' no está definido
    "use server"
    // Encripta la contraseña antes de enviar los datos
    const hashedPassword = await bcrypt.hash(data.userPassword, 10);
    const user = {
      id: data.userId,          // ID del usuario
      username:String(data.username),
      nombre: String(data.userNombre),      // Nombre del usuario
      password: hashedPassword, // Contraseña
      email: data.userEmail,     // Correo del usuario
      telefono: String(data.userPhone), // Teléfono
    }
    console.log("Datos enviados al backend:", user);

    try {
      const result = await apiFetch('/users', {
        method: 'POST',
        body: JSON.stringify(user),
      });
  // Cambia la condición para identificar una respuesta exitosa
  if (result && result.message === 'Usuario creado') {
    return true;
  } else {
    console.error("Error del backend:", result.message);
    return result.message || false;
  }
} catch (error: any) {
  console.error("Error en la creación del usuario:", error);

  if (error.response && error.response.status) {
    switch (error.response.status) {
      case 409:
        return 'El usuario ya existe';
      case 400:
        return 'Datos inválidos en el formulario';
      case 500:
        return 'Error en el servidor al crear el usuario';
      default:
        return 'Error desconocido';
    }
  }
  return 'Error de conexión o configuración';
}
}


  return (
    <div className="main-creation-containers">
      <div className="create-title-container">
        <h1>Nuevo Usuario</h1>
      </div>
      <CreateUserForm sendUserData={sendUserData}/>
    </div>
  );
}
