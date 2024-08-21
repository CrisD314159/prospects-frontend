
import CreateForm from '@/app/ui/CreateForm/CreateForm';
import './styles.css'
import dotenv from 'dotenv'

dotenv.config({ path: 'variables_db.env' })

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


export default async function Create() {
  const flats = await (await fetch('http://' + process.env.HOST_DEV +  '/flats')).json()
  const assessors = await (await fetch('http://' + process.env.HOST_DEV +  '/assessors')).json()
  const complexes  = await (await fetch('http://' + process.env.HOST_DEV +  '/complexes')).json()
 
  async function sendData(data: DataInput) {
    "use server"
    const prospectname = `Prospecto ${data.complex} Apartamento ${data.flatName}`
    const prospect ={
      id: data.clientID,
      nombreProspecto:prospectname,
      nombreCliente: data.clientname, 
      telCliente: parseInt(data.clientPhone) , 
      emailCliente: data.clientMail, 
      observacion: data.remark,
      idInmueble: data.flatName,
      idAsesor: data.assessorName,
      idConjunto: data.complex
    }
    const response = await fetch('http://' + process.env.HOST_DEV +  '/prospects', {
      method: 'POST',
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
    <div className="main-creation-containers">
      <div className="create-title-container">
        <h1>Nuevo Prospecto</h1>
      </div>
      <CreateForm flats={flats} assessors={assessors} complexes={complexes} sendData={sendData}/>

    </div>
  );
}
      