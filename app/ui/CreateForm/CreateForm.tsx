'use client'

import { useState } from "react"
import'./createForm.css'
import Link from "next/link"

export default function CreateForm(
  {flats, assessors, complexes, sendData}: 
  {flats: Array<Flat>, assessors: Array<Assessor>, complexes: Array<Complex>, sendData: (data: any) => Promise<any>}) {

  const [clientID, setClientID] = useState('')
  const [prospectStatus, setProspectStatus] = useState(false)
  const [clientname, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientMail, setClientMail] = useState('')
  const [remark, setRemark] = useState('')
  const [flatName, setFlatName] = useState(flats[0].nombre)
  const [assessorName, setAssessorName] = useState(assessors[0].id)
  const [complex, setComplex] = useState(complexes[0].id)

  const cleanFields = () => {
    setClientID('')
    setClientName('')
    setClientPhone('')
    setClientMail('')
    setRemark('')
    setFlatName(flats[0].nombre)
    setAssessorName(assessors[0].id)
    setComplex(complexes[0].id)
    
  }
  const getData = async () => {
    const data ={
      clientID,
      clientname,
      clientPhone,
      clientMail,
      remark,
      flatName,
      assessorName,
      complex
    }
    const answer = await sendData(data)
    if(answer){
      setProspectStatus(true)
      cleanFields()
    }else{
      alert('Error al crear el prospecto (El prospecto ya existe)')
    }
    
    
  }
  if(prospectStatus){ 
    return (
      <div className="create-form-container">
        <h1 className="created-title">Prospecto creado con éxito</h1>
        <Link href="http://localhost:3000/dashboard"><button className="back-button">Volver a inicio</button></Link>
      </div>
    ) 
  }
  return (
    <div className="create-form-container">
      <form onSubmit={(e)=>{
        e.preventDefault()
        getData()
        }} className="create-form">
        <label>Cedula del cliente</label>
        <input type="text" name="clientID" onChange={(e)=>{setClientID(e.target.value)}} required className="form-input"/>

        <label>Nombre del cliente</label>
        <input type="text" name="clientName" onChange={(e)=>{setClientName(e.target.value)}} required className="form-input"/>

        <label>Teléfono del cliente</label>
        <input type="tel" name="clientPhone" onChange={(e)=>{setClientPhone(e.target.value)}} required max={10} className="form-input"/>

        <label>Correo del cliente</label>
        <input type="email" name="clientMail" onChange={(e)=>{setClientMail(e.target.value)}} required max={40} className="form-input"/>

        <label>Observación del prospecto</label>
        <textarea  name="remark" onChange={(e)=>{setRemark(e.target.value)}} required className="form-textarea"/>

        <div className="select-container">
          <label>Nombre del apartamento</label>
          <select name="flatName" onChange={(e)=>{setFlatName(e.target.value)}}>
            {flats.map((flat, index) => {
              return <option key={index} value={flat.nombre}>{flat.nombre}</option>
            })}
          </select>

          <label>Nombre del asesor</label>
          <select name="assessorName" onChange={(e)=>{setAssessorName(e.target.value)}}>
            {assessors.map((assessor, index) => {
              return <option key={index} value={assessor.id}>{assessor.nombre}</option>
            })}
          </select>

          <label>Conjunto</label>
          <select name="complex" onChange={(e)=>{setComplex(e.target.value)}}>
            {complexes.map((complex, index) => {
              return <option key={index} value={complex.id}>{complex.nombre}</option>
            })}
          </select>
        </div>

        

        <button className="send-button">Enviar</button>
      </form>

    </div>
  )
}