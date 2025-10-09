import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams, useNavigate } from "react-router-dom"
import { CheckboxList } from "../cmps/CheckboxList.jsx"

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM


export function ToyDetails() {
    const [toy, setToy] = useState(null)

    const { toyId } = useParams()
    const [labelArr, setLabelArr] = useState(null)

    const navigate = useNavigate()
    useEffect(() => {
        loadLabels();
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }
    function loadLabels() {
        toyService.getLabels()
            .then(labels => setLabelArr(labels))
            .catch(err => {
                console.log('Had issues in toy labels', err)
                navigate('/toy')
            })
    }
    function handleSelectedItemsChange(as) {

    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="car-details">
            <h1>Toy name : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            {/* <p>⛐</p> */}
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p> */}
            <label htmlFor="inStock">inStock : </label>
                            <input type="checkbox"
                                name="inStock"
                                id="inStock"                    
                                checked={toy.inStock}
                                disabled
                            />
                            <br/>
                            {toy.labels && (
                            <CheckboxList
                                isDisabled={true}
                                KeyValuelabelList={labelArr}
                                selectedListFromOutside={toy.labels}
                                onSelectedItemsChange={handleSelectedItemsChange}
                            />)
                            }
            
            
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            {/* <Link to={`/toy`}>Back</Link>
            <p>
                <Link to="/toy/nJ5L4">Next Car</Link>
            </p> */}
        </section>
    )
}