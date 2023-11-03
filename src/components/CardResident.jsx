import { useEffect } from "react";
import useFetch from "../hooks/useFetch"

const CardResident = ({ url }) => {

  const [ resident, getResident ] = useFetch(url);

  useEffect( () => {
    getResident();
  }, []);

  const bgStatus = () => {
    if (resident?.status === "Alive"){
        return "lawngreen"
    } else if (resident?.status === "Dead"){
        return "red"
    } else {
        return "gray"
    }
}
 
  return (
    <article className="resident">
        <header className="resident__front">
            <img className="resident__img" src={ resident?.image } alt="" />
            <div className="resident__status-box">
                <div className="circle" style={{backgroundColor: bgStatus()}}></div>
                <span className="resident__status"> { resident?.status } </span>
            </div>
            <div className="resident__name-bg">
              <h3 className="resident__name"> { resident?.name } </h3>
            </div>
        </header>
        {/* <section className="resident__info">
            
            
            <ul>
                <li><span>Specie: </span><span> { resident?.species } </span></li>
                <li><span>Origin:  </span><span> { resident?.origin.name } </span></li>
                <li><span>Episodes where appear: </span><span> { resident?.episode.length } </span></li>
            </ul>
        </section> */}
    </article>
  )
}

export default CardResident
