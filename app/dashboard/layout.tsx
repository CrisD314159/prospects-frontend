import HeaderComponent from "../ui/HeaderComponent/HeaderComponent";

export default function Layout({children}:{children: React.ReactNode}) {
  return (
   
    <div>
       <HeaderComponent/>
      {children}
      </div>
  )
  
}