interface ProspectoView {
  id: string,
  nombrecliente: string,
  telefonocliente: string,
  correocliente: string,
  observacion: string,
  nombreapto: string,
  torre: string,
  descapto: string,
  nombreconjunto:string,
  nombreasesor: string,
  telasesor: string,
  emailasesor: string
}

interface Flat {
  nombre:string,
  torre:string,
  descripcion:string
}

interface Assessor {
  id:string,
  nombre:string,
  telefono:string,
  email:string
}

interface Complex{
  id:string,
  nombre:string
}


interface DataInput {
    clientID:string,
    clientname:string,
    clientPhone :string,
    clientMail :string,
    remark :string,
    flatName :string,
    assessorName :string,
    complex :string
}

interface User {
  id:string,
  usuario:string,
  nombre:string,
  telefono:string,
  password:string,
  email:string
  esadministrador:boolean
}