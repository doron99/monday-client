import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";

 const allPeople = [
        { _id: 'u100',name: 'Doron test' },
        { _id: 'u101',name: 'Gil test' },
        { _id: 'u102',name: 'Mira test' },
        // Add more people as needed
    ];
export const PopperContentMember = ({ members, buttonRef, onSelect, onClose }) => {

  const isDev = useSelector(storeState => storeState.devToolModule.isDev)

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeople, setSelectedPeople] = useState(allPeople.filter(person => members.includes(person._id)));
 

    const handleAddPerson = (person) => {
        setSelectedPeople([...selectedPeople, person]);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPeople = allPeople.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const isFirstRender = useRef(true); // Ref to track the first render


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



  const devSection = isDev 
        ? <pre>
            {JSON.stringify(filteredPeople, null, 2)}
          </pre> 
        : "";
  return (
    <div  className="dropdown-men1">
              {devSection}

      <div  className="popper-arrow" />
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
      <div class="search-container">
        <input
          type="text"
          class="search-input"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search names, roles or teams"
        />
        <span class="search-icon">🔍</span>
      </div>
      <div className="suggested-container">
            {/* <h3>Suggested People</h3> */}
              <div class="suggested-title">Suggested people</div>

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
