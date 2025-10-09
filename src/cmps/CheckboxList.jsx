import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function CheckboxList({
    isDisabled = false,
    KeyValuelabelList = [],
    selectedListFromOutside = [],
    onSelectedItemsChange,
    checkboxesPerRow = 1
}) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [keyValueLabelArray, setKeyValueLabelArray] = useState([]);
    //const [_selectedListFromOutside, set_selectedListFromOutside] = useState(selectedListFromOutside);

    // Set initial selected items based on selectedListFromOutside
    useEffect(() => {
        //console.log('Updating selected items from props');
        setSelectedItems(selectedListFromOutside); // Initialize selectedItems
    }, []); // Run effect when selectedListFromOutside changes

    // Update keyValueLabelArray whenever selectedItems changes
    useEffect(() => {
        const updatedKeyValueLabelArray = KeyValuelabelList.map(item => ({
            label: item,
            checked: selectedItems.includes(item) // Determine if the item is selected
        }));
        setKeyValueLabelArray(updatedKeyValueLabelArray);
    }, [selectedItems]); // Run effect when selectedItems or KeyValuelabelList changes

    // Effect to call onSelectedItemsChange when selectedItems changes
    useEffect(() => {
        //console.log('selectedItems changed', selectedItems);
        onSelectedItemsChange(selectedItems);
    }, [selectedItems, onSelectedItemsChange]);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(value)) {
                // If already selected, remove it
                return prevSelected.filter(item => item !== value);
            } else {
                // If not selected, add it
                return [...prevSelected, value];
            }
        });
    };

    // const handleSubmit = () => {
    //     console.log('Selected items:', selectedItems);
    //     // You can send the selectedItems to an API or handle it as needed
    // };
    
    return (
        <section className="">
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>

            
            {keyValueLabelArray.map(({ label, checked }) => (
                <div key={label}
                style={{
                        width: `${100 / checkboxesPerRow}%`, // Dynamic width based on checkboxes per row
                        boxSizing: 'border-box', // Ensure padding and border are included in the width
                        padding: '5px' // Optional padding for spacing
                    }}>
                    <label>
                        <input
                            type="checkbox"
                            value={label}
                            checked={checked} // Use the checked property from the transformed array
                            onChange={handleCheckboxChange} // Handle change event
                            disabled={isDisabled}
                        />
                        {label}
                    </label>
                </div>
            ))}
            </div>
            {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {checkedItems.map(({ label, checked }, index) => (
                <div
                    key={label}
                    style={{
                        width: `${100 / checkboxesPerRow}%`, // Dynamic width based on checkboxes per row
                        boxSizing: 'border-box', // Ensure padding and border are included in the width
                        padding: '5px' // Optional padding for spacing
                    }}
                >
                    <label>
                        <input
                            type="checkbox"
                            value={label}
                            checked={checked}
                            onChange={() => handleCheckboxChange(label)}
                            disabled={isDisabled}
                        />
                        {label}
                    </label>
                </div>
            ))}
        </div> */}
            {/* <pre>
                {JSON.stringify(selectedListFromOutside, null, 2)}
            </pre> */}
            {/* <button onClick={handleSubmit}>Submit</button> */}
        </section>
    );
}

// export function ToyLabelCheckboxList({
//     KeyValuelabelList = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'],
//     selectedListFromOutside = [],
//     onSelectedItemsChange
// }) {
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [_selectedListFromOutside, set_selectedListFromOutside] = useState(selectedListFromOutside);
//     const [keyValueLabelArray, setKeyValueLabelArray] = useState([]);

//     // Set initial selected items based on selectedListFromOutside
//     useEffect(() => {
//         console.log('selectedListFromOutside', _selectedListFromOutside);
//         set_selectedListFromOutside(selectedListFromOutside);
//         setSelectedItems(selectedListFromOutside); // Initialize selectedItems
//         console.log('KeyValuelabelList[0]',KeyValuelabelList[0],'_selectedListFromOutside',)
//         setKeyValueLabelArray(KeyValuelabelList.map(item => ({
//             label: item,
//             checked: _selectedListFromOutside.includes(item) // Determine if the item is selected
//     })))
//     }, []); // Run effect when selectedListFromOutside changes

//     // Effect to call onSelectedItemsChange when selectedItems changes
//     useEffect(() => {
//         console.log('selectedItems changed', selectedItems);
//         onSelectedItemsChange(selectedItems);
//     }, [selectedItems]);

//     // Transform KeyValuelabelList into an array of objects with label and checked properties
//     // const keyValueLabelArray = KeyValuelabelList.map(item => ({
//     //     label: item,
//     //     checked: selectedItems.includes(item) // Determine if the item is selected
//     // }));

//     const handleCheckboxChange = (event) => {
//         const value = event.target.value;
//         setSelectedItems((prevSelected) => {
//             if (prevSelected.includes(value)) {
//                 // If already selected, remove it
//                 return prevSelected.filter(item => item !== value);
//             } else {
//                 // If not selected, add it
//                 return [...prevSelected, value];
//             }
//         });
//     };

//     const handleSubmit = () => {
//         console.log('Selected items:', selectedItems);
//         // You can send the selectedItems to an API or handle it as needed
//     };

//     return (
//         <section className="">
//             <h2>Labels List</h2>
//             {keyValueLabelArray.map(({ label, checked }) => (
//                 <div key={label}>
//                     <label>
//                         <input
//                             type="checkbox"
//                             value={label}
//                             checked={checked} // Use the checked property from the transformed array
//                             onChange={handleCheckboxChange} // Handle change event
//                         />
//                         {label}
//                     </label>
//                 </div>
//             ))}
//             <pre>
//              {JSON.stringify(selectedListFromOutside, null, 2)}

//              </pre>
//             <button onClick={handleSubmit}>Submit</button>
//         </section>
//     );
// }






















// export function ToyLabelCheckboxList({
//     KeyValuelabelList = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'],
//     selectedListFromOutside = [],
//     onSelectedItemsChange
// }) {
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [_selectedListFromOutside, set_selectedListFromOutside] = useState(selectedListFromOutside);


//     // Effect to call onSelectedItemsChange when selectedItems changes
//     useEffect(() => {
//         console.log('selectedItems changed', selectedItems);
//         onSelectedItemsChange(selectedItems);
//     }, [selectedItems, onSelectedItemsChange]);

//     // Transform KeyValuelabelList into an array of objects with label and checked properties
//     const keyValueLabelArray = KeyValuelabelList.map(item => ({
//         label: item,
//         checked: selectedItems.includes(item) // Determine if the item is selected
//     }));

//     const handleCheckboxChange = (event) => {
//         const value = event.target.value;
//         setSelectedItems((prevSelected) => {
//             if (prevSelected.includes(value)) {
//                 // If already selected, remove it
//                 return prevSelected.filter(item => item !== value);
//             } else {
//                 // If not selected, add it
//                 return [...prevSelected, value];
//             }
//         });
//     };

//     const handleSubmit = () => {
//         console.log('Selected items:', selectedItems);
//         // You can send the selectedItems to an API or handle it as needed
//     };

//     return (
//         <section className="">
//             <h2>Labels List</h2>
//             <pre>
//             {JSON.stringify(keyValueLabelArray, null, 2)}

//             </pre>
//             {keyValueLabelArray.map(({ label, checked }) => (
//                 <div key={label}>
//                     <label>
//                         <input
//                             type="checkbox"
//                             value={label}
//                             checked={checked} // Use the checked property from the transformed array
//                             onChange={handleCheckboxChange} // Handle change event
//                         />
//                         {label}
//                     </label>
//                 </div>
//             ))}
//             <button onClick={handleSubmit}>Submit</button>
//         </section>
//     );
// }
