
import Link from 'next/link';
import './styles.css'
import DeleteButton from '../ui/DeleteButton/DeleteButton';
import { apiFetch } from '@/api';


export default async function DashboardPage() {
  const response = await apiFetch("/prospects", {cache:"no-store"})
  const prospectos = await response


  const deleteProspect = async (id:string) => {
    "use server"
    const response = await (await apiFetch(`/prospects/${id}`, { method: 'DELETE' }))
    if(response){
      return true
    } else {    
     return false
    } 
    
  }

  if(!prospectos){
    return (
      <div className='main-propsect-container'>
        <div className="tool-container">
          <div className='title-container'>
            <h1 className="tool-title">Todos Los Prospectos</h1>
          </div> 
        </div>
        <div className="prospects-container">
          <div className='create-button-container'>
            <Link href="/dashboard/create" className='create-button-container'><button className="create-button">Nuevo Prospecto</button></Link>
          </div>
          <div className='no-prospects'>
            <h1>No hay prospectos</h1>
          </div>
        </div>
      </div>
    )
  }
  return (
    
    <div className='main-propsect-container'>
      
      <div className="tool-container">
        <div className='title-container'>
          <h1 className="tool-title">Todos Los Prospectos</h1>
        </div> 
      </div>
      

      <div className="prospects-container">
        <div className='create-button-container'>
        <Link href="/dashboard/create" className='create-button-container'><button className="create-button">Nuevo Prospecto</button></Link>
          
        </div>
      
        {prospectos.map((prospect: ProspectoView) => {
          return (
            <div key={prospect.id} className="prospect-container">
              <p className="prospect-flat">Apartamento {prospect.nombreapto} torre {prospect.torre}</p>
              <p className="prospect-client">Cliente: {prospect.nombrecliente}</p>
              <p className="prospect-ass">Asesor/a: {prospect.nombreasesor}</p>


              
              <div className='button-container'>
              <Link href={`/dashboard/view/${prospect.id}`} className='prospect-button'>
                <button className='prospect-button'>Ver prospecto </button>
              </Link>
                <DeleteButton id={prospect.id} deleteProspect={deleteProspect}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}