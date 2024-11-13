'use client';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

export default function DeleteUserButton({id, deleteUser}:{id:string, deleteUser: (data:any) => Promise<any>}){
  const router = useRouter()
  return (
    <button className='delete-user-button' onClick={async ()=>{
      const answer = await  deleteUser(id)
      if(answer){
        router.refresh()
      }

    }}><DeleteIcon/></button>
  )

}