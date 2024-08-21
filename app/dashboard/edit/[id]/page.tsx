
import EditForm from "@/app/ui/EditForm/EditForm"
import './styles.css'
import dotenv from 'dotenv'

dotenv.config({ path: 'variables_db.env' })

export default async function Edit({params}: {params: {id: string}}) {
  const {id} = params
  const prospect = await (await fetch (`http://` + process.env.HOST_DEV +  `/prospects/${id}`, {cache:"no-store"})).json()
  const flats = await (await fetch('http://' + process.env.HOST_DEV +  '/flats')).json()
  const assessors = await (await fetch('http://' + process.env.HOST_DEV +  '/assessors')).json()
  const complexes  = await (await fetch('http://' + process.env.HOST_DEV +  '/complexes')).json()

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
    const response = await fetch(`http://` + process.env.HOST_DEV +  `/prospects/${id}`, {
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