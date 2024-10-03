import Link from 'next/link';
import './styles.css';
import DeleteButton from '../ui/DeleteButton/DeleteButton';
import GenerateButton from '../ui/GenerateButton/GenerateButton';
import { apiFetch } from '@/api';
import { ToastContainer } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';

export default async function DashboardPage() {
  const response = await apiFetch("/prospects", { cache: "no-store" });
  const prospectos = await response;

  const handleGenerateReport = async () => {
    "use server";
    try {
      await apiFetch('/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      toast.error('Hubo un problema con la solicitud');
    }
  };

  const deleteProspect = async (id: string) => {
    "use server";
    const response = await (await apiFetch(`/prospects/${id}`, { method: 'DELETE' }));
    return response ? true : false;
  };

  if (!prospectos) {
    return (
      <div className='main-propsect-container'>
        <div className="tool-container">
          <div className='title-container'>
            <h1 className="tool-title">Todos Los Prospectos</h1>
          </div>
        </div>
        <div className="prospects-container">
          <div className='create-button-container'>
            <Link href="/dashboard/create" className='create-button-container'>
              <button className="create-button">Nuevo Prospecto</button>
            </Link>
          </div>
          <div className='no-prospects'>
            <h1>No hay prospectos</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='main-propsect-container'>
      <div className="tool-container">
        <div className='title-container'>
          <h1 className="tool-title">Todos Los Prospectos</h1>
        </div>
      </div>
      <div className="prospects-container">
        <div className='prospects-buttons-container'>
          <div className='create-button-container'>
            <Link href="/dashboard/create" className='create-button-container'>
              <button className="create-button">Nuevo Prospecto</button>
            </Link>
          </div>
          <div className='generate-button-container'>
            <GenerateButton generateProspect={handleGenerateReport}/>
            <Toaster position="top-center" />
          </div>
        </div>

        {prospectos.map((prospect: ProspectoView) => (
          <div key={prospect.id} className="prospect-container">
            <p className="prospect-flat">Apartamento {prospect.nombreapto} torre {prospect.torre}</p>
            <p className="prospect-client">Cliente: {prospect.nombrecliente}</p>
            <p className="prospect-ass">Asesor/a: {prospect.nombreasesor}</p>
            <div className='button-container'>
              <Link href={`/dashboard/view/${prospect.id}`} className='prospect-button'>
                <button className='prospect-button'>Ver prospecto</button>
              </Link>
              <DeleteButton id={prospect.id} deleteProspect={deleteProspect} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}