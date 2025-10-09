import { useEffect, useState,useCallback  } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import {CheckboxList} from '../cmps/CheckboxList.jsx'
import {useSelector } from 'react-redux'


// const { useState, useEffect } = React
// const { Link, useNavigate, useParams } = ReactRouterDOM


export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(null)
    const { toyId } = useParams()
    const [labelArr, setLabelArr] = useState(null)
    const isDev = useSelector(storeState => storeState.devToolModule.isDev)

    useEffect(() => {
        loadLabels();
        if (toyId) 
            loadToy()
        else
            toyService.getEmptyToy()

    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => {return setToyToEdit(toy);})
            .catch(err => {
                console.log('Had issues in toy edit', err)
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
    function handleChange({ target }) {

        let { value, type, name: field } = target
        console.log(value, type, field,target)

        value = type === 'number' ? +value : value
        if (type == 'checkbox') {
            value = target.checked ? true : false;
        }
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }
    function setLabelsToCurrentUser(items) {
        console.log('setLabelsToCurrentUser',items);
        setToyToEdit((prevToy) => ({ ...prevToy, labels: items }))

        
    }
     const handleSelectedItemsChange = useCallback((selectedItems) => {
        console.log('Updated selected items:', selectedItems);
        setToyToEdit((prevToy) => ({ ...prevToy, labels: selectedItems }))
    }, []);
    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 1000
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    const devSection = isDev 
    ? <pre>
          {JSON.stringify(toyToEdit, null, 2)}
      </pre>
    : "";
    if (!toyToEdit) return <span>loading...</span>
    
    return (
        <section className="car-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
            
            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <br/>
                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />
                <br/>
                <label htmlFor="inStock">inStock : </label>
                <input type="checkbox"
                    name="inStock"
                    id="inStock"                    
                    checked={toyToEdit.inStock}
                    onChange={handleChange}
                />
                <br/>
                {toyToEdit.labels && (
                <CheckboxList
                    KeyValuelabelList={labelArr}
                    selectedListFromOutside={toyToEdit.labels}
                    onSelectedItemsChange={handleSelectedItemsChange}
                />
            )}
                {/* <ToyLabelCheckboxList 
                selectedListFromOutside={Object.assign([],toyToEdit.labels)} 
                onSelectedItemsChange={handleSelectedItemsChange} /> */}
                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}