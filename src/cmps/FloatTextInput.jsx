import { useState,useEffect } from 'react'

// const { useSelector, useDispatch } = ReactRedux


export function FloatTextInput({ id , type='text',txt = '', label = '...' , placeholder = '',style={}, onChange }) {
    const [inputValue, setInputValue] = useState(txt);
    useEffect(() => {
        setInputValue(txt); // Update state when txt prop changes
    }, [txt]);
    
    

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        onChange(newValue,id); // Send the new value to the parent component
    };


    
    return (
        <div style={style} className="float-text-input ">
            <label htmlFor="floatField1 " style={{background:'white'}}>{label}</label>
            <input type={type}  placeholder={placeholder} style={{background:'transparent'}}
                value={inputValue}
                onChange={handleChange} />
        </div>
    )

}