import Link from 'next/link';
import '/app/dashboardUsers/view/[id]/styles.css';
import { apiFetch } from '@/api';

export default async function UserViewPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const response = await apiFetch(`/assessors/${id}`, { cache: 'no-store' });
  console.log(response)
  const user: User = await response;

  return (
    <div className="main-userview-container">
      <div className="userview-container">
        <h1 className="userview-name">{user.nombre}</h1>
        <p className='user-info'>Username: {user.usuario}</p>
        <p className='user-info'>Teléfono: {user.telefono}</p>
        <p className="userview-email">Email: {user.email}</p>
        <div className="buttonview-container">
          <Link href={`/dashboardUsers/edit/${id}`}>
            <button className="editview-button">Editar Usuario</button>
          </Link>
          <Link href="/dashboardUsers">
            <button className="backview-button">Volver</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
