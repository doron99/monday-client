import { useState } from "react"

export function PopperContentPerson({ allPeople, selectedPeople, onAdd, onRemove }) {
  const [search, setSearch] = useState("")

  const filtered = allPeople.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="person-popper-menu">
      <div className="person-popper-search-container">
        <input
          type="text"
          className="person-popper-input"
          placeholder="Search people..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {selectedPeople.length > 0 && (
        <div className="person-popper-badge-list">
          {selectedPeople.map(person => (
            <span key={person._id} className="person-popper-badge">
              {person.name}
              <span
                className="person-popper-remove"
                onClick={() => onRemove(person._id)}
              >
                ✕
              </span>
            </span>
          ))}
        </div>
      )}

      <div className="person-popper-suggested">
        <div className="person-popper-suggested-title">Suggested people</div>
        {filtered.map(person => (
          <div
            key={person._id}
            className={`person-popper-suggested-row ${
              selectedPeople.some(p => p._id === person._id) ? "selected" : ""
            }`}
            onClick={() => onAdd(person)}
          >
            {person.name}
          </div>
        ))}
      </div>
    </div>
  )
}
