'use client';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import toast from 'react-hot-toast';

export default function GenerateButton({generateProspect}:{generateProspect: () => Promise<any>}) {
  return (
    <button className='generate-button' onClick={async() =>{
        toast.success('Generando reporte, los resultados se enviarán a tu email');
        generateProspect()
    }}>
      <FileCopyIcon /> Generar Reporte
    </button>
  );
}
