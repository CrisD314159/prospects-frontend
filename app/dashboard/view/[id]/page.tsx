
import Link from 'next/link'
import './styles.css'
export default async function ViewPage({params}:{params:{id:string}}) {
  const {id} = params
  const response = await fetch(`https://apiappprospectos-production.up.railway.app/prospects/${id}`,  { cache: 'no-store' })
  const prospect:ProspectoView = await response.json()

  return(
    <div className='main-prospect-view-container'>
      <div className="prospect-view-container">
        <div className="flat-container view-component">
          <h1>Inmueble</h1>
          <p>Número de apartamento: {prospect.nombreapto}</p>
          <p>Torre apartamento: {prospect.torre}</p>
          <p>Descripción apartamento: {prospect.descapto}</p>
          <p>Proyecto: {prospect.nombreconjunto}</p>

         
        </div>
        <div className="client-container view-component">
          <h1>Cliente</h1>
          <p>Cédula del cliente: {prospect.id}</p>
          <p>Nombre del cliente: {prospect.nombrecliente}</p>
          <p>Teléfono del cliente: {prospect.telefonocliente}</p>
          <p>Correo del cliente: {prospect.correocliente}</p>

          <p>Observación del prospecto: {prospect.observacion}</p>

        </div>
        <div className="ass-container view-component">
          <h1>Asesor</h1>
          <p>Nombre Asessor: {prospect.nombreasesor}</p>
          <p>Teléfono asesor: {prospect.telasesor}</p>
          <p>Correo asesor: {prospect.emailasesor}</p>

        </div>
        <Link href={`http://localhost:3000/dashboard/edit/${prospect.id}`}><button className='edit-button'>Editar Prospecto</button></Link>
       
      </div>


    </div>
  )

  
} 