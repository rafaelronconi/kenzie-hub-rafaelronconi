import { useForm } from "react-hook-form"
import api from "../../Services/api"
import "./style.css"

function InfoCard({ id, setInfoCard }){
    const tech = JSON.parse(localStorage.getItem("@kenzieHub:user")).techs.filter((tech) => tech.id === id)
    const token = JSON.parse(localStorage.getItem("@kenzieHub:token"))
    const userId = JSON.parse(localStorage.getItem("@kenzieHub:user")).id

    const { register, handleSubmit } = useForm()

    const UpdateFunction = (data) => {
        api.put(`/users/techs/${tech[0].id}`, data, {
            headers: {
                Authorization: `bearer ${token}`,
            }
        })
        .then(() => {
            api.get(`/users/${userId}`).then((resp) => {
                localStorage.setItem("@kenzieHub:user", JSON.stringify(resp.data))
                refreshPage()
            })})
        .catch((err) => console.log(err))
    }

    const deleteTech = () => {
        api.delete(`/users/techs/${tech[0].id}`, {
            headers: {
                Authorization: `bearer ${JSON.parse(localStorage.getItem("@kenzieHub:token"))}`,
            }
        })
        .then(() => {
            api.get(`/users/${userId}`).then((resp) => {
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
                    <p>Tecnologias Detalhes</p>
                    <button onClick={() => setInfoCard(false)}>X</button>
                </header>
                <div className="infoCardMain">
                    <label className="infoCardLabel">Nome do projeto</label>
                    <div className="infoCardTitle">
                        {tech[0].title}
                    </div>
                    <label className="infoCardLabel">Status</label>
                    <form onSubmit={handleSubmit(UpdateFunction)}>
                        <select {...register("status")} className="infoCardStatus">
                            <option>{tech[0].status}</option>
                            {tech[0].status === "Iniciante"? 
                            <option value={"Intermediário"}>Intermediário</option>:
                            <option value={"Iniciante"}>Iniciante</option>}
                            {tech[0].status !== "Avançado"? 
                            <option value={"Avançado"}>Avançado</option>:
                            <option value={"Intermediário"}>Intermediário</option>}                    
                        </select>
                        <div className="buttons">
                            <button type="submit" className="saveButton">Salvar e sair</button>
                            <button onClick={() => deleteTech()} className="deleteButton">Deletar</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}
export default InfoCard