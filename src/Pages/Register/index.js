import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Redirect, useHistory } from "react-router-dom"
import api from "../../Services/api"
import "./style.css"

function Register({ authenticated }){

    const formSchema = yup.object().shape({
        name: yup.string().required("Nome obrigatorio")
            .matches(/^[A-Z]{1}[a-zA-ZÁ-ü ']{1,}[0-9]{0,0}$/, "Nome inválido"),
        email: yup.string().required("E-mail obrigatorio").email("E-mail invalido"),
        password: yup.string().required("Senha obrigatoria")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])(?:([0-9a-zA-Z$*&@#!])(?!\1)){8,}$/, "Senha inválida"),
        verification: yup.string().required("Verificação obrigatoria")
            .oneOf([yup.ref("password"),null], "Verificação incorreta"),
        bio: yup.string().required("Bio obrigatoria"),
        contact: yup.string().required("Contato obrigatorio")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver:yupResolver(formSchema)
    })
    
    const history = useHistory()

    if(authenticated){
        return <Redirect to="/menu"/>
    }

    const onSubmitFunction = (data) => {
        delete data.verification
        console.log(data)
        api.post("/users", data)
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err))
        history.push("/")
    }

    const returnFunction = () => {
        history.push("/")
    }

    return(
        <div className="registerContainer">
            <header className="header">
                <h1 className="logo">Kenzie Hub</h1>
                <button onClick={() => returnFunction()} className="returnButton">Voltar</button>
            </header>
            <div className="formContainerRegister">
                <h1 className="text1">Crie sua conta</h1>
                <p className="text2">Rapido e grátis, vamos nessa</p>
                <form onSubmit={handleSubmit(onSubmitFunction)} className="registerForm">
                    <label className="registerLabel">Nome</label>
                    <input placeholder="Digite aqui seu nome" {...register("name")} className="input"/>
                    <div className="erro">{errors.name?.message}</div>
                    <label className="registerLabel">E-mail</label>
                    <input placeholder="Digite aqui seu E-mail" {...register("email")} className="input"/>
                    <div className="erro">{errors.email?.message}</div>
                    <label className="registerLabel">Senha</label>
                    <input placeholder="Digite aqui sua senha" {...register("password")} className="input" type="password"/>
                    <div className="erro">{errors.password?.message}</div>
                    <label className="registerLabel">Verificação de senha</label>
                    <input placeholder="Verifique sua senha" {...register("verification")} className="input" type="password"/>
                    <div className="erro">{errors.verification?.message}</div>
                    <label className="registerLabel">Biografia</label>
                    <input placeholder="Escreva um pouco sobre você" {...register("bio")} className="input"/>
                    <div className="erro">{errors.bio?.message}</div>
                    <label className="registerLabel">Contato</label>
                    <input placeholder="Alguma rede social sua" {...register("contact")} className="input"/>
                    <div className="erro">{errors.contact?.message}</div>
                    <label className="registerLabel">Módulo</label>
                    <select {...register("course_module")} className="input">
                        <option value={"Primeiro módulo (Introdução ao Frontend)"}>Primeiro módulo</option>
                        <option value={"Segundo módulo (Frontend Avançado)"}>Segundo módulo</option>
                        <option value={"Terceiro módulo (Introdução ao Backend)"}>Terceiro módulo</option>
                        <option value={"Quarto módulo (Backend Avançado)"}>Quarto módulo</option>
                    </select>
                    <button type="submit" className="registerSubmitButton">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
export default Register