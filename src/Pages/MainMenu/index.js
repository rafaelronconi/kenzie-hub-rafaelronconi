import { useState } from "react"
import { Redirect, useHistory } from "react-router-dom"
import TechCards from "../../Components/TechCards"
import InfoCard from "../../Components/InfoCard"
import AddCard from "../../Components/AddCard"
import "./style.css"
import add_icon from "../../add_icon.png"

function MainMenu({ setAuthenticated, authenticated }){

    const [id, setId] = useState(0)

    const [infoCard, setInfoCard] = useState(false)

    const [addCard, setAddCard] = useState(false)

    const history = useHistory()

    const returnFunction = () => {
        setAuthenticated(false)
        localStorage.clear()
        history.push("/")
    }

    if(!authenticated){
        return <Redirect to="/"/>
    }

    function handleClick(id){
        setInfoCard(true)
        setId(id)
    }

    return(
        <div className="menuContainer">
            <header className="headerMenu">
                <h1 className="logo">Kenzie Hub</h1>
                <button onClick={() => returnFunction()} className="returnButton">Voltar</button>
            </header>
            <section className="userInfo">
                <div>
                    <p className="welcomeText">Olá, {JSON.parse(localStorage.getItem("@kenzieHub:user")).name}</p>
                    <p className="module">{JSON.parse(localStorage.getItem("@kenzieHub:user")).course_module}</p>
                </div>
            </section>
            <div className="techsContainer">
                <div className="techsHeader">
                    <p>Tecnologias</p>
                    <button onClick={() => setAddCard(true)} className="addButton">
                        <img src={add_icon} alt="botao de adicionar"/>
                    </button>
                </div>
                <TechCards handleClick={handleClick}/>
            </div>
            {infoCard === true? <InfoCard id={id} setInfoCard={setInfoCard}/>:<div></div>}
            {addCard === true? <AddCard setAddCard={setAddCard}/>:<div></div>}
        </div>
    )
}
export default MainMenu