import { useState, useMemo } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { utilService } from "../../services/util.service.js"
import { loadBoards } from "../../store/actions/board.actions.js"

export function BoardFilter({ onToggleFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ txt: "" })
  const [isOpen, setIsOpen] = useState(false)

  const debouncedSetFilter = useMemo(
    () => utilService.debounce((filter) => applyFilter(filter), 100),
    []
  )

  useEffectUpdate(() => {
    debouncedSetFilter(filterByToEdit)
  }, [filterByToEdit])

  async function applyFilter(filter) {
    try {
      await loadBoards(filter)
    } catch (err) {
      console.log("Cannot load boards:", err)
    }
  }

  function handleChange({ target }) {
    const field = target.name
    const value = target.value
    setFilterByToEdit(prev => ({ ...prev, [field]: value }))
  }

  function toggleFilter(ev) {
    ev.stopPropagation()
    setIsOpen(prev => {
      const newState = !prev
      if (onToggleFilter) onToggleFilter(newState)
      return newState
    })
  }

  return (
    <section className={`board-filter ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <MagnifyingGlassIcon
          style={{ width: "16px", height: "16px" }}
          className="search-icon"
          onClick={toggleFilter}
          title="Search boards"
        />
      )}

      {isOpen && (
        <div className="filter-wrapper">
          <div className="filter-input-container">
            <input
              className="filter-input"
              autoFocus
              type="search"
              name="txt"
              placeholder="Search boards..."
              value={filterByToEdit.txt || ""}
              onChange={handleChange}
            />
            <MagnifyingGlassIcon
              style={{ width: "16px", height: "16px" }}
              className="search-icon inside"
              onClick={toggleFilter}
            />
          </div>
        </div>
      )}
    </section>
  )
}
