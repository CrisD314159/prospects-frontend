'use client';

import Link from "next/link";
import { useState } from "react";
import './editUserForm.css';

export default function EditUserForm(
  { user, sendEditData }: 
  { user: User, sendEditData: (data: any) => Promise<any> }
) {
  const [userStatus, setUserStatus] = useState(false);
  const [name, setName] = useState(user.nombre);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.usuario);
  const [phone, setPhone] = useState(user.telefono);

  const cleanFields = () => {
    setName('');
    setEmail('');
    setUsername('');
    setPhone('');
  };

  const getEditData = async () => {
    const data = {
      username: username,
      nombre: name,
      telefono: phone,
      email
    };
    
    try {
      
        const answer = await sendEditData(data);
        //alert(answer)
        if (answer) {
          setUserStatus(true);
          cleanFields();
        } else {
          console.error('Error al actualizar el usuario'); // Agregar este log
        }
      } catch (error) {
        console.error('Error al enviar datos:', error); // Captura cualquier error
      }
  };

  if (userStatus) { 
    return (
      <div className="edit-user-form-container">
        <h1 className="edit-title">Usuario actualizado con éxito</h1>
        <Link href="/dashboardUsers">
          <button className="back-button">Volver a inicio</button>
        </Link>
      </div>
    ); 
  }

  return (
    <div className="edit-user-form-container">
      <form onSubmit={(e) => {
        e.preventDefault();
        getEditData();
      }} className="edit-user-form">
        <label>Nombre del usuario</label>
        <input 
          type="text" 
          name="userName" 
          onChange={(e) => { setName(e.target.value); }} 
          required 
          className="form-input" 
          value={name}
        />

        <label>Email del usuario</label>
        <input 
          type="email" 
          name="userEmail" 
          onChange={(e) => { setEmail(e.target.value); }} 
          required 
          className="form-input" 
          value={email}
        />

        <label>Username</label>
        <input 
          type="text" 
          name="username" 
          onChange={(e) => { setUsername(e.target.value); }} 
          required 
          className="form-input" 
          value={username}
        />

        <label>Teléfono del usuario</label>
        <input 
          type="tel" 
          name="userPhone" 
          onChange={(e) => { setPhone(e.target.value); }} 
          required 
          maxLength={10} 
          className="form-input" 
          value={phone}
        />
        
        <button className="save-button">Enviar</button>
      </form>
    </div>
  );
}
