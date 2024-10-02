
import EditForm from "@/app/ui/EditForm/EditForm"
import './styles.css'
import { apiFetch } from "@/api"

export default async function Edit({params}: {params: {id: string}}) {
  const {id} = params
  const prospect = await (await apiFetch(`/prospects/${id}`, {cache:"no-store"}))
  const flats = await (await  apiFetch('/flats'))
  const assessors = await (await  apiFetch('/assessors'))
  const complexes  = await (await  apiFetch('/complexes'))

  async function sendData(data: DataInput) {
    "use server"
    const prospectname = `Prospecto ${data.complex} Apartamento ${data.flatName}`
    const prospect ={
      nombreProspecto:prospectname,
      nombreCliente: data.clientname, 
      telCliente: parseInt(data.clientPhone) , 
      emailCliente: data.clientMail, 
      observacion: data.remark,
      idInmueble: data.flatName,
      idConjunto: data.complex
    }
    const response = await apiFetch(`/prospects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prospect)
    })
    if(response.ok) {
      return true
    }else{
      return false
    }  
  }
  return (
    <div className="main-edit-containers">
    <div className="edit-title-container">
      <h1 className="edit-title">Editar prospecto</h1>
    </div>
    <EditForm prospect={prospect} flats={flats} assessors={assessors} complexes={complexes} sendData={sendData}/>

  </div>
  )
}