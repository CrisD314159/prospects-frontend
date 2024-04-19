import Image from "next/image";
import LoginForm from "./ui/LoginForm/LoginForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-24 cont">

      <div className="formContainer">
        <div className="imageContainer">
          <img src="/camu-header.png" alt="logo"/>
        </div>
        <LoginForm/>
      </div>
    </div>
  );
}
