// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState, useCallback } from "react"
import { utilService } from "../services/util.service.js"
import {FloatTextInput} from "../cmps/FloatTextInput.jsx"
import {CheckboxList} from "../cmps/CheckboxList.jsx"
import {toyService} from "../services/toy.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [labelArr, setLabelArr] = useState(null)


    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))
    useEffect(() => {
        loadLabels();
    },[])
    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])
    function loadLabels() {
        toyService.getLabels()
            .then(labels => setLabelArr(labels))
            .catch(err => {
                console.log('Had issues in toy labels', err)
                navigate('/toy')
            })
    }
    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     value = type === 'number' ? +value : value
    //     setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    // }
    function handleChange({ target }) {
        console.log('target',target)
        const field = target.name
        let value = target.value
        console.log('target.type',target.type,
            'target.name',target.name,
            'target.value',target.value)

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break
             case 'select-one':
                console.log('select-one');
                value = target.value;
                break
        
            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    const handleChangeNew = (newValue,txtInputId) => {
        //setTxt(newValue); // Update the state with the new value
        console.log('handleChangeNew','input',txtInputId,'value',newValue)
        let field = '';
        if (txtInputId == 'name') {
            field = 'name';
        } else if (txtInputId == 'txtPriceFilter') {
            field = 'price';
        }
                
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: newValue }))

        
    };

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }
    const iconSvgStyle = {
            width:'20px',
            height:'20px',
            display:'inline-block'
        }
    const { name, labels,inStock, orderBy, isDesc } = filterByToEdit
    // function setLabelsToCurrentUser(items) {
    //     console.log('setLabelsToCurrentUser',items);
    //     //setToyToEdit((prevToy) => ({ ...prevToy, labels: items })) 
    // }
    const handleSelectedItemsChange = useCallback((selectedItems) => {
            console.log('Updated selected items:', selectedItems);
            //setToyToEdit((prevToy) => ({ ...prevToy, labels: selectedItems }))
            setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: selectedItems }))

        }, []);
    return (
        <section className="car-filter full main-layout">
            <h2>Toys Filter</h2>
        {/* <fieldset className="car-filter" style={{ maxWidth: '630px', margin: 'auto' }} >
            <legend className="car-filter-legend">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ display: 'inline-block' }}>Filter Toys</span>
                    {/* <SvgIcon iconName='filter' style={iconSvgStyle} /> *}
                </div>
            </legend> */}

            <form className="car-filter-form" onSubmit={onSubmitFilter} >

                <div style={{display:'flex'}}>
                    <div>
                        <div style={{ marginBottom: '5px',width:'150px',marginTop:'10px' }}>

                            <FloatTextInput
                                id="name"
                                txt={name}
                                label="Toy Name"
                                placeholder=""
                                onChange={handleChangeNew} />
                        </div>
                        <fieldset style={{width:'150px'}}>
                        <legend>In Stock:</legend>
                            <div>
                            <input type="radio" id="all" name="inStock" value="all"
                                checked={inStock === 'all'}
                                onChange={handleChange}/>
                            <label htmlFor="all">All</label>
                            </div>
                            <div>
                            <input type="radio" id="inStock" name="inStock" value="inStock"
                            checked={inStock === 'inStock'}
                            onChange={handleChange} />
                        <label htmlFor="inStock">inStock</label>
                            </div>
                            <div>
                            <input type="radio" id="outOfStock" name="inStock" value="outOfStock"
                                checked={inStock === 'outOfStock'}
                                onChange={handleChange}/>
                            <label htmlFor="outOfStock">outOfStock</label>
                            </div>
                       
                    </fieldset>
                    <fieldset style={{width:'150px'}}>
                        <legend>Order by:</legend>
                        <div>
                            {/* <label htmlFor="order-select">Order by:</label> */}
                            <select id="order-select" name="orderBy" 
                            value={filterBy.orderBy} 
                            onChange={handleChange}>
                                <option value="createdAt">createdAt</option>
                                <option value="name">name</option>
                                <option value="price">price</option>
                            </select>
                        </div>
                        <div>
                            <label>
                                <input
                                    name="isDesc"
                                    type="checkbox"
                                    checked={filterBy.isDesc} // Controlled component
                                    onChange={handleChange} // Event handler
                                />
                                Desc
                            </label>
                        </div>
                    </fieldset>

                    </div>
                   
                    {labelArr &&
                    <fieldset style={{width:'150px'}}>
                    <legend>Labels:</legend>
                        <div>
                    <CheckboxList
                    checkboxesPerRow={1}
                            KeyValuelabelList={labelArr}
                            selectedListFromOutside={labels}
                            onSelectedItemsChange={handleSelectedItemsChange}
                        />
                        </div>
                        </fieldset>
                        }
                    
                   
                    
                </div>
            </form>
        {/* </fieldset> */}
        </section>
  
    )
}