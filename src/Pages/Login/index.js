import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useHistory } from "react-router-dom"
import api from "../../Services/api"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import "./style.css"


function Login({ authenticated, setAuthenticated }){

    const history = useHistory()

    const formSchema = yup.object().shape({
        email: yup.string().required("E-mail obrigatorio").email("E-mail invalido"),
        password: yup.string().required("Senha obrigatoria")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver:yupResolver(formSchema)
    })

    const onSubmitFunction = (data) => {
        api
            .post("/sessions", data)
            .then((response) => {
                const { token, user } = response.data
                localStorage.clear()
                localStorage.setItem("@kenzieHub:token",JSON.stringify(token))
                localStorage.setItem("@kenzieHub:user", JSON.stringify(user))
                setAuthenticated(true)
            })
            .catch((err) => {
                localStorage.clear()
                console.log(err)
            })
    }

    const registrationFunction = () => {
        history.push("/register")
    }

    if(authenticated){
        return <Redirect to="/menu"/>
    }

    return(
        <div className="loginContainer">
            <h2 className="title">Kenzie Hub</h2>
            <div className="formContainer">
                <h1 className="loginTitle">Login</h1>
                <form onSubmit={handleSubmit(onSubmitFunction)}>
                    <label className="label">E-mail</label>
                    <input {...register("email")} className="inputEmail"/>
                    <div className="erro">{errors.email?.message}</div>
                    <label className="label">Senha</label>
                    <input type="password" {...register("password")} className="inputPassword"/>
                    <div className="erro">{errors.password?.message}</div>
                    <button type="submit" className="loginBuntton">Entrar</button>
                </form>
                <p className="registerText">Ainda não possui uma conta?</p>
                <button onClick={() => registrationFunction()} className="registerButton">Cadastrar</button>
            </div>
        </div>
    )
}
export default Login