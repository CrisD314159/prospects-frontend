'use client'

import { useState } from "react"
import './createUserForm.css'
import Link from "next/link"

export default function CreateUserForm({ sendUserData }: { sendUserData: (data: any) => Promise<any> }) {
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')
  const [nombre, setUserNombre] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const [creationStatus, setUserCreationStatus] = useState(false)
  
  const cleanUserFields = () => {
    setUserId('')
    setUsername('')
    setUserNombre('')
    setUserPhone('')
    setUserEmail('')
    setUserPassword('')
  }

  const getData = async () => {
    const data = {
      userId: String(userId), // Convierte a string
      username: String(username), // Convierte a string
      userNombre:String(nombre),
      userPhone: String(userPhone), // Convierte a string
      userEmail,
      userPassword
    }
    const result = await sendUserData(data);
  
    if (result === true) {
      setUserCreationStatus(true);
      cleanUserFields();
    } else {
      alert(`Error al crear el usuario: ${result}`);
    }
  }

  if (creationStatus) {

    return (
      <div className="create-user-form-container">
        <h1 className="created-title">Usuario creado con éxito</h1>
        <Link href="/dashboardUsers"><button className="back-button">Volver a inicio</button></Link>
      </div>
    )
  }

  return (
    <div className="create-user-form-container">
      <form onSubmit={(e) => {
        e.preventDefault()
        getData()
      }} className="create-user-form">
        <label>ID del usuario</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required className="form-input" />

        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="form-input" />

        <label>Password</label>
        <input type="text" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required className="form-input" />

        <label>Nombres y Apellidos</label>
        <input type="text" value={nombre} onChange={(e) => setUserNombre(e.target.value)} required className="form-input" />

        <label>Teléfono del usuario</label>
        <input type="tel" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} required maxLength={10} className="form-input" />

        <label>Correo del usuario</label>
        <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required className="form-input" />

        <button className="send-button">Enviar</button>
      </form>
    </div>
  )
}
