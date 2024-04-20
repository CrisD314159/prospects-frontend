
import './headerComponent.css'
import Image from 'next/image'
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from '@/auth'
export default function HeaderComponent() {
  return(
    <header className="header-main">
      <div className="image-container">
        <a href="/dashboard">
           <Image src="/camu-header.png" alt="logo" height={40} width={150}/>
        </a>
      </div>
      <div className="listContainer">
        <ul className="list">
          <li><a href="/dashboard">Inicio</a></li>
          <li>
          <form action={async () => {
                'use server';
                await signOut()
            }}>
                <button className='logout-button'><LogoutIcon /></button>
            </form>
          </li>
        </ul>
      </div>
    </header>
  )
  
}