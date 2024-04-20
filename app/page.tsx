import Image from "next/image";
import LoginForm from "./ui/LoginForm/LoginForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-24 cont">

      <div className="formContainer">
        <div className="imageContainer">
          <Image src="/camu-header.png" alt="logo" width={150} height={40}/>
        </div>
        <LoginForm/>
      </div>
    </div>
  );
}
