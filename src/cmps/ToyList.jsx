import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from "react-router-dom";

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {
    console.log('toys',toys)
    //if (!toys || toys.length == 0) return [];
    return (
        <ul className="car-list">
            {toys.map(toy =>
                <li className="car-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <Link to={`/toy/${toy._id}`}>Details</Link>

                    </div>
                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>

                    <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button>
                </li>)}
        </ul>
    )
}