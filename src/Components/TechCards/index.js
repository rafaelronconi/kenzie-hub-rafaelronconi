import './style.css'

function TechCards({ handleClick }){


    return(
        <div className="techList">
            {JSON.parse(localStorage.getItem("@kenzieHub:user")).techs.map((tech) => 
                <div key={tech.id} className="card" onClick={() => handleClick(tech.id)}>
                    <div className='cardTitle'>{tech.title}</div>
                    <div className='cardStatus'>{tech.status}</div>
                </div>  
            )}
        </div>
    )
}
export default TechCards