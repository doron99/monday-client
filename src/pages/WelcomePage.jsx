import { useDispatch, useSelector } from "react-redux"
import { CHANGE_BY } from "../store/reducers/user.reducer.js"
import { useEffect, useRef, useState } from "react"
import imgUrl from "../assets/img/logo.png"
import { AppSideBar } from "../cmps/AppSideBar.jsx"
import { BoardDetails } from "./BoardDetails.jsx"
import { useNavigate } from "react-router"
import { createPopper } from "@popperjs/core";
const statuses = [
  { label: "Done", color: "#00C875" },
  { label: "Stuck", color: "#E2445C" },
  { label: "Working on it", color: "#C4C4C4" },
  { label: "fhgfhgf", color: "#FFCB00" },
];
export function WelcomePage() {
    const dispatch = useDispatch()
    const [_count, setCount] = useState(10)
    const count = useSelector(storeState => storeState.userModule.count)
    const navigate = useNavigate()

 const [selected, setSelected] = useState(statuses[0]);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const popperRef = useRef(null);
  const popperInstance = useRef(null);

  useEffect(() => {
    if (open && buttonRef.current && popperRef.current) {
      popperInstance.current = createPopper(buttonRef.current, popperRef.current, {
        placement: "bottom-start",
        modifiers: [
          { name: "offset", options: { offset: [0, 8] } },
          { name: "preventOverflow", options: { padding: 8 } },
        ],
      });
    }
    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy();
        popperInstance.current = null;
      }
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        popperRef.current &&
        !popperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    return (
        <main className="welcome-page-container">
            <h1>Welcome Page</h1>
            <button type="button" onClick={() => navigate('/board')}>Login</button>
            <div className="status-dropdown-container">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="status-button"
        style={{ backgroundColor: selected.color }}
      >
        {selected.label}
      </button>

      {open && (
        <div ref={popperRef} className="dropdown-menu">
          <div>
            {statuses.map((s, idx) => (
              <div key={idx}>
                <button
                  onClick={() => {
                    setSelected(s);
                    setOpen(false);
                  }}
                  className="dropdown-item"
                  style={{ backgroundColor: s.color }}
                >
                  {s.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
        </main>
    )
}