'use client'
import { useFormState, useFormStatus } from "react-dom"
import './loginForm.css'
import { authenticate} from '@/app/lib/actions'
export default function LoginForm (){
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
      <form className="formulary" action={dispatch}>
        <input type="text" name="username" id="username" placeholder="Ingresa tu usuario" required autoFocus/>
        <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" required/>

        <LoginButton/>
        <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <>

                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
            </div>

      </form>
  )
}
function LoginButton() {
  const {pending} = useFormStatus()

  return(
    <button className="sign-in-button" aria-disabled = {pending}>Iniciar sesión</button>
  )

}