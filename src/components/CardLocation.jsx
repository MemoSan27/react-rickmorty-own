
const CardLocation = ({ location }) => {
  return (
    <article className="card-location">
        <h2 className="card-location__title"> { location?.name } </h2>
        <ul className="card-location__list">
            <li className="card-location__item"><span className="card-location__description">Type: </span><span className="card-location__info"> { location?.type } </span></li>
            <li className="card-location__item"><span className="card-location__description">Dimension: </span><span className="card-location__info"> { location?.dimension } </span></li>
            <li className="card-location__item"><span className="card-location__description">Population: </span><span className="card-location__info"> { location?.residents.length } </span></li>
        </ul>
    </article>
  )
}

export default CardLocation
