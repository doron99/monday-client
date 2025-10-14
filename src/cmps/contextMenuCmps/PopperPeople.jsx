import { createPopper } from "@popperjs/core";
import { useEffect, useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const peopleList = [
  { _id: 'u100',name: 'Doron test'},
  { _id: 'u101',name: 'Gil test'},
  { _id: 'u102',name: 'Mira test'},
];

export const PopperPeople = ({ members,isOpen, buttonRef, onSelect, onClose }) => {
  const popperRef = useRef(null);
  const popperInstance = useRef(null);
  const arrowRef = useRef(null);
  const isDev = useSelector(storeState => storeState.devToolModule.isDev)

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [peopleToAdd, setPeopleToAdd] = useState(peopleList);

  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const isFirstRender = useRef(true); // Ref to track the first render

  useEffect(() => {
    if (isOpen && buttonRef.current && popperRef.current) {
      popperInstance.current = createPopper(buttonRef.current, popperRef.current, {
        placement: 'bottom',
        modifiers: [
          { name: 'offset', options: { offset: [0, 8] } },
          { name: 'arrow', options: { element: arrowRef.current } },
          { name: 'preventOverflow', options: { boundary: 'viewport' } },
          { name: 'flip', options: { fallbackPlacements: ['top', 'right', 'left'] } },
        ],
      });
    }

    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy();
      }
    };
  }, [isOpen, buttonRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target) &&
          popperRef.current && !popperRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, buttonRef, onClose]);

  useEffect(() => {
    if(!isFirstRender.current) {
      const userIds = selectedPeople.map(u => u._id)
      console.log('updated',selectedPeople,userIds)
      onSelect(userIds)
    }
    else {
      isFirstRender.current = false;
    }
    
  },[selectedPeople])

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
    setSuggestionsVisible(inputValue.length > 0);
  };

  const filteredPeople = peopleList.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToList = (obj) => {
    console.log('name',obj)
    if (selectedPeople.some(u => u._id === obj._id)){
      return;
    }
    setSelectedPeople(prev => [...prev, obj]);
    setSearchTerm('');
    setSuggestionsVisible(false);
    console.log('addToList')
    
  };

  const removeFromList = (name) => {
    setSelectedPeople(prev => prev.filter(person => person !== name));
    console.log('removeFromList')
  };
  const filteredPeople1 = peopleList.filter(person =>
  !selectedPeople.includes(person.name) // Exclude already selected people
  );


  if (!isOpen) return null; // Do not render Popper if not open
  const devSection = isDev 
        ? <pre>
            {JSON.stringify(filteredPeople, null, 2)}
          </pre> 
        : "";
  return (
    <div ref={popperRef} className="dropdown-menu">
              {devSection}

      <div ref={arrowRef} className="popper-arrow" />
        {suggestionsVisible && filteredPeople.length > 0 && (
          <div style={{ border: '1px solid #ccc', background: 'white', position: 'absolute', zIndex: 1000 }}>
            {filteredPeople.map(person => (
              <div
                key={person.name}
                onClick={() => addToList(person.name)}
                style={{ padding: '10px', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              {person.name}
            </div>
          ))}
        </div>
      )}
      <div style={{ position: 'relative' }}>
        
      <ul>
        {selectedPeople.map(person => (
          <li key={person.name}>
            <FaRegCircleUser/>{person.name} <button onClick={() => removeFromList(person)}>X</button>
          </li>
        ))}
      </ul>
      <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search names, roles or teams"
        />
    </div>
    <div>
      <div>suggested list</div>
      <div className="suggested-list">
        {peopleToAdd.map(person => (
          <div className="suggested-list-item" onClick={() => addToList(person)} key={person.name}>
            <FaRegCircleUser/>&nbsp;{person.name} 
          </div>
        ))}
      </div>
    </div>
    <div className=""></div>
      <button onClick={onClose}>Close</button> {/* Optional close button */}
    </div>
  );
};
