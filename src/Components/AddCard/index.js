import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import api from "../../Services/api"
import "./style.css"

function AddCard({ setAddCard }){
    const userId = JSON.parse(localStorage.getItem("@kenzieHub:user")).id

    const formSchema = yup.object().shape({
        title: yup.string().required("Necessário nomear a tecnologia"),
    })
    
    const { register, handleSubmit, formState: { errors }  } = useForm({
        resolver:yupResolver(formSchema)
    })

    const AddFunction = (data) => {
        api.post(`/users/techs`, data, {
            headers: {
                Authorization: `bearer ${JSON.parse(localStorage.getItem("@kenzieHub:token"))}`,
            }
        })
        .then(() => {api.get(`/users/${userId}`).then((resp) => {
            localStorage.setItem("@kenzieHub:user", JSON.stringify(resp.data))
            refreshPage()
        })})
        .catch((err) => console.log(err))
    }

    const refreshPage= () => window.location.reload()

    return(
        <div className="backGround">
            <div className="infoCardContainer">
                <header className="infoCardHeader">
                    <p>Cadastrar tecnologias</p>
                    <button onClick={() => setAddCard(false)}>X</button>
                </header>
                <div className="addCardMain">
                    <form onSubmit={handleSubmit(AddFunction)} className="addCardForm">
                        <label className="addCardLabel">Nome</label>
                        <input placeholder="Nome da sua tecnologia" {...register("title")} className="addInput"></input>
                        <div className="erro">{errors.title?.message}</div>
                        <label className="addCardLabel">Selecionar status</label>
                        <select {...register("status")} className="addInput">
                            <option value={"Iniciante"}>Iniciante</option>
                            <option value={"Intermediário"}>Intermediário</option>
                            <option value={"Avançado"}>Avançado</option>
                        </select>
                        <button type="submit" className="addCardButton">Cadastrar tecnologia</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddCard