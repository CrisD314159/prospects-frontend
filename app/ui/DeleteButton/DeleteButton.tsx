'use client';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

export default function DeleteButton({id, deleteProspect}:{id:string, deleteProspect: (data:any) => Promise<any>}){
  const router = useRouter()
  return (
    <button className='delete-button' onClick={async ()=>{
      const answer = await  deleteProspect(id)
      if(answer){
        router.refresh()
      }

    }}><DeleteIcon/></button>
  )

}