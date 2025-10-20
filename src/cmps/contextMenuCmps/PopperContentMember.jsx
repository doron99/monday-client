import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";
import { updateBoard } from "../../store/actions/board.actions";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

 const allPeople = [
        { _id: 'u100',name: 'Doron test' },
        { _id: 'u101',name: 'Gil test' },
        { _id: 'u102',name: 'Mira test' },
        // Add more people as needed
    ];
export const PopperContentMember = ({ content, buttonRef, onSelect, onClose }) => {
  console.log('PopperContentMember content',content)
  const isDev = useSelector(storeState => storeState.devToolModule.isDev)

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeople, setSelectedPeople] = useState(allPeople.filter(person => content.members.includes(person._id)));
 

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

  useEffectUpdate(() => {
    const userIds = selectedPeople.map(u => u._id)
      console.log('members updated',selectedPeople,userIds)
      console.log('handleMembersSelect',content.groupId, content.taskId, { key:'members', value:userIds });
      updateBoard(content.groupId, content.taskId, { key:'members', value:userIds });
      onClose();
  }, [selectedPeople])

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
                <div className="person-popper-badge-list">
                    {selectedPeople.map((person, index) => (
                      // style={{margin: '5px', padding: '5px', border: '1px solid #ccc'}}
                        <span className="person-popper-badge" key={index} >
                            {person.name}&nbsp;
                            <span
                             className="person-popper-remove" 
                            style={{cursor:'pointer'}} 
                            onClick={() => setSelectedPeople(selectedPeople.filter(p => p !== person))} 
                            >✕</span>
                        </span>
                    ))}
                </div>
            </div>
            {selectedPeople.length > 0 
              && <div style={styles.personPopperSearchSeperator}></div>}
            
      <div class="person-popper-search-container">
        <input
          type="text"
          class="person-popper-input"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search names, roles or teams"
        />
        {/* <span class="search-icon">🔍</span> */}
      </div>
      <div className="person-popper-suggested">
            {/* <h3>Suggested People</h3> */}
              <div class="person-popper-suggested-title">Suggested people</div>

            <div>
                {filteredPeople.map((person, index) => 
                  !selectedPeople.some(selected => selected.name === person.name) && (
                      <div 
                      onClick={() => handleAddPerson(person)} 
                      className="person-popper-suggested-row" key={index}>
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
const styles = {
  personPopperSearchSeperator: {
    height:'0.5rem',
    width:'100%',
    borderTop:'1px solid #d0d4e4',
    marginTop:'0.5rem'

  }
}