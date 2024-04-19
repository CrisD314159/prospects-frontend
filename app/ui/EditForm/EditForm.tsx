'use client';

import Link from "next/link";
import { useState } from "react";
import './editForm.css'

export default function EditForm(
  {prospect, flats, assessors, complexes, sendData}: 
  {prospect: ProspectoView, flats: Array<Flat>, assessors: Array<Assessor>, complexes: Array<Complex>, sendData: (data: any) => Promise<any>}) {
    const currentAssessor = assessors.find(assessor => assessor.nombre === prospect.nombreasesor) 
    const currentComplex = complexes.find(complex => complex.nombre === prospect.nombreconjunto)

    const [prospectStatus, setProspectStatus] = useState(false)
    const [clientname, setClientName] = useState(prospect.nombrecliente)
    const [clientPhone, setClientPhone] = useState(prospect.telefonocliente)
    const [clientMail, setClientMail] = useState(prospect.correocliente)
    const [remark, setRemark] = useState(prospect.observacion)
    const [flatName, setFlatName] = useState(prospect.nombreapto)
    const [assessorName, setAssessorName] = useState(currentAssessor?.id)
    const [complex, setComplex] = useState(currentComplex?.id)

   

    console.log(prospect.nombreconjunto, prospect.nombreasesor);
  
    const cleanFields = () => {
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
        clientname,
        clientPhone,
        clientMail,
        remark,
        flatName,
        complex
      }
      const answer = await sendData(data)
      if(answer){
        setProspectStatus(true)
        cleanFields()
      }
      
      
    }
    if(prospectStatus){ 
      return (
        <div className="create-form-container">
          <h1 className="created-title">Prospecto actualizado con éxito</h1>
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
          <label>Nombre del cliente</label>
          <input type="text" name="clientName" onChange={(e)=>{setClientName(e.target.value)}} required className="form-input" value={clientname}/>
  
          <label>Teléfono del cliente</label>
          <input type="tel" name="clientPhone" onChange={(e)=>{setClientPhone(e.target.value)}} required max={10} className="form-input" value={clientPhone} />
  
          <label>Correo del cliente</label>
          <input type="email" name="clientMail" onChange={(e)=>{setClientMail(e.target.value)}} required max={40} className="form-input" value={clientMail}/>
  
          <label>Observación del prospecto</label>
          <textarea  name="remark" onChange={(e)=>{setRemark(e.target.value)}} required className="form-textarea" value={remark}/>
  
          <div className="select-container">
            <label>Nombre del apartamento</label>
            <select name="flatName" onChange={(e)=>{setFlatName(e.target.value)}} defaultValue={flatName}>
              {flats.map((flat, index) => {
                return <option key={index} value={flat.nombre}>{flat.nombre}</option>
              })}
            </select>
  
            <label>Nombre del asesor</label>
            <select name="assessorName" onChange={(e)=>{setAssessorName(e.target.value)}} defaultValue={assessorName} disabled>
              {assessors.map((assessor, index) => {
                return <option key={index} value={assessor.id}>{assessor.nombre}</option>
              })}
            </select>
  
            <label>Conjunto</label>
            <select name="complex" onChange={(e)=>{setComplex(e.target.value)}} defaultValue={complex}>
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