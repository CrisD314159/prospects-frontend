"use server"
import EditForm from "@/app/ui/EditForm/EditForm"
import './styles.css'

export default async function Edit({params}: {params: {id: string}}) {
  const {id} = params
  const prospect = await (await fetch (`https://apiappprospectos-production.up.railway.app/prospects/${id}`, {cache:"no-store"})).json()
  const flats = await (await fetch('https://apiappprospectos-production.up.railway.app/flats')).json()
  const assessors = await (await fetch('https://apiappprospectos-production.up.railway.app/assessors')).json()
  const complexes  = await (await fetch('https://apiappprospectos-production.up.railway.app/complexes')).json()

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
    const response = await fetch(`https://apiappprospectos-production.up.railway.app/prospects/${id}`, {
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