import Link from 'next/link';
import './styles.css';
import DeleteUserButton from '../ui/DeleteUserButton/DeleteUserButton';
import GenerateButton from '../ui/GenerateButton/GenerateButton';
import { apiFetch } from '@/api';
import { Toaster } from 'react-hot-toast';

export default async function UserDashboardPage() {
  const response = await apiFetch("/users", { cache: "no-store" });
  const users = await response;


  const deleteUser = async (id: string) => {
    "use server";
    const response = await (await apiFetch(`/users/${id}`, { method: 'DELETE' }));
    return response ? true : false;
  };
 
  if (!users) {
    return (
      <div className='main-user-container'>
        <div className="tool-container">
          <div className='title-container'>
            <h1 className="tool-title">Todos Los Usuarios</h1>
          </div>
        </div>
        <div className="users-container">
          <div className='create-button-container'>
            <Link href="/dashboard/create-user" className='create-button-container'>
              <button className="create-button">Nuevo Usuario</button>
            </Link>
          </div>
          <div className='no-users'>
            <h1>No hay usuarios</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='main-user-container'>
      <div className="tool-container">
        <div className='title-container'>
          <h1 className="tool-title">Todos Los Usuarios</h1>
        </div>
      </div>
      <div className="users-container">
        <div className='users-buttons-container'>
          <div className='create-button-container'>
            <Link href="/dashboardUsers/create" className='create-button-container'>
              <button className="create-button">Nuevo Usuario</button>
            </Link>
          </div>
          </div>
        

        {users.map((user: User) => (
          <div key={user.id} className="user-container">
            <p className="user-name">{user.nombre}</p>
            <p className="user-email">Email: {user.email}</p>
            <div className='button-container'>
              <Link href={`/dashboardUsers/view/${user.id}`} className='user-button'>
                <button className='user-button'>Ver Usuario</button>
              </Link>
              <DeleteUserButton id={user.id} deleteUser={deleteUser} />
            </div>
          </div>
          
        ))}
      </div>
      </div>
  );
}
