import { createPopper } from "@popperjs/core";
import { useEffect, useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";

const peopleList = [
  { _id: 'u100',name: 'Doron test'},
  { _id: 'u101',name: 'Gil test'},
  { _id: 'u102',name: 'Mira test'},
];
 const allPeople = [
        { _id: 'u100',name: 'Doron test' },
        { _id: 'u101',name: 'Gil test' },
        { _id: 'u102',name: 'Mira test' },
        // Add more people as needed
    ];
export const PopperPeople = ({ members,isOpen, buttonRef, onSelect, onClose }) => {
  const popperRef = useRef(null);
  const popperInstance = useRef(null);
  const arrowRef = useRef(null);
  const isDev = useSelector(storeState => storeState.devToolModule.isDev)

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeople, setSelectedPeople] = useState(allPeople.filter(person => members.includes(person._id)));
  const [peopleToAdd, setPeopleToAdd] = useState(peopleList);
 

    const handleAddPerson = (person) => {
        setSelectedPeople([...selectedPeople, person]);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPeople = allPeople.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
          //{ name: 'flip', options: { fallbackPlacements: ['top', 'right', 'left'] } },
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

  const filteredPeople22 = peopleList.filter(person =>
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
         <div>
            <div>
                {/* <h3>Selected People</h3> */}
                <div className="member-badge-list">
                    {selectedPeople.map((person, index) => (
                      // style={{margin: '5px', padding: '5px', border: '1px solid #ccc'}}
                        <span className="member-badge" key={index} >
                            {person.name}&nbsp;<FaRegTimesCircle style={{cursor:'pointer'}} onClick={() => setSelectedPeople(selectedPeople.filter(p => p !== person))} />
                        </span>
                    ))}
                </div>
            </div>
            
            {/* <input
                type="text"
                placeholder="Search names, roles or teams"
                value={searchTerm}
                onChange={handleSearch}
            /> */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search names, roles or teams"
        />
        <span className="search-icon">🔍</span>
      </div>
      <div className="suggested-container">
            {/* <h3>Suggested People</h3> */}
              <div className="suggested-title">Suggested people</div>

            <div>
                {filteredPeople.map((person, index) => 
                  !selectedPeople.some(selected => selected.name === person.name) && (
                      <div onClick={() => handleAddPerson(person)} className="suggested-row" key={index}>
                          <span>{person.name}</span>
                          {/* <button onClick={() => handleAddPerson(person)}>Add</button> */}
                      </div>
                  )
              )}
            </div>
      </div>    
        </div>
    </div>
  );
};
