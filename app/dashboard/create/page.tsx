"use server";
import CreateForm from "@/app/ui/CreateForm/CreateForm";
import './createStyles.css'

export default async function CreatePage() {
  const flats = await (await fetch('https://apiappprospectos-production.up.railway.app/flats')).json()
  const assessors = await (await fetch('https://apiappprospectos-production.up.railway.app/assessors')).json()
  const complexes  = await (await fetch('https://apiappprospectos-production.up.railway.app/complexes')).json()
 
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
    const response = await fetch('https://apiappprospectos-production.up.railway.app/prospects', {
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
      