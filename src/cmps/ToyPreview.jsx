import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <h1>⛐</h1>
            {/* <p>Price: <span>${car.price.toLocaleString()}</span></p>
            <p>Speed: <span>{car.speed.toLocaleString()} km/h</span></p>
            {car.owner && <p>Owner: <Link to={`/user/${car.owner._id}`}>{car.owner.fullname}</Link></p>}
            <hr />
            <Link to={`/car/edit/${car._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/car/${car._id}`}>Details</Link> */}

        </article>
    )
}