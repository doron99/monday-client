import { useState, useRef } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { FilterPopper } from "./FilterPopper";
import { PopperContentPerson } from "./PopperContentPerson";
import { setFilter } from "../../store/actions/board.actions";

export function PersonFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const buttonRef = useRef(null);

  const allPeople = [
    { _id: "u100", name: "Doron test" },
    { _id: "u101", name: "Gil test" },
    { _id: "u102", name: "Mira test" },
  ];

  function toggleMenu() {
    setIsOpen(prev => !prev);
  }

  function handleAdd(person) {
    if (selectedPeople.some(p => p._id === person._id)) return;
    const updated = [...selectedPeople, person];
    setSelectedPeople(updated);
    setFilter({ members: updated.map(p => p._id) });
  }

  function handleRemove(personId) {
    const updated = selectedPeople.filter(p => p._id !== personId);
    setSelectedPeople(updated);
    setFilter({ members: updated.map(p => p._id) });
  }

  return (
    <div className="person-filter-wrapper">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="board-filter-btn"
      >
        <UserCircleIcon className="icon" />
        People
      </button>

      <FilterPopper
        anchorEl={buttonRef.current}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <PopperContentPerson
          allPeople={allPeople}
          selectedPeople={selectedPeople}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      </FilterPopper>
    </div>
  );
}
