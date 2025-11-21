import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaPlus, FaUserPlus } from "react-icons/fa6";
import { eventBusService } from "../../services/event-bus.service";
import UserAvatarSvg from '../../assets/svgs/user-avatar.svg';

 const allPeople = [
        { _id: 'u100',name: 'Doron test' },
        { _id: 'u101',name: 'Gil test' },
        { _id: 'u102',name: 'Mira test' },
        // Add more people as needed
    ];


export function Member({ info,taskId,content,onTaskUpdate }) {
    //console.log('info',info,priorites.find(item => item.label == info))
  const [selected, setSelected] = useState(info);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const isDev = useSelector(storeState => storeState.devToolModule.isDev)

  // Toggle Functions
  const handleClose = () => setOpen(false); // Set to false to close
  const handleOpen = () => setOpen(true); // Set to true to open

  const onSelect = (value) => {
    console.log('onSelect object received:', value)//['u100', 'u102']
    setSelected(value);
    handleClose(); // Close after selection
    onTaskUpdate({ key: "members", value: value });
  };
const devSection = isDev 
    ? <pre>
        {JSON.stringify(selected, null, 2)}
        </pre> 
    : "";
 const openDynamicPopper = (btnRef) => {
      const rect = buttonRef.current.getBoundingClientRect(); // Get the rectangle object
      //const x = rect.x + window.scrollX; // Calculate x coordinate
      //const y = rect.y + window.scrollY; // Calculate y coordinate
      const x = rect.x + rect.width / 2 + window.scrollX; // Centered horizontally
      const y = rect.bottom + window.scrollY; // Positioned below the button

      eventBusService.emit('openPopperDynamic', { x, y, content:content,component:'member' }); // Emit the event with x, y

    };
    const selectedPeople = allPeople.filter(person => selected.includes(person._id));
const count = selectedPeople.length;
  return (
    <div className="task-member" ref={buttonRef} onClick={() => openDynamicPopper()}>
      <button class="add-person-btn fa-solid plus"></button>

    {devSection}




  <div style={{ display: 'flex', alignItems: 'center' }}>
    
    {/* -------- אין בכלל אנשים -------- */}
    {count === 0 && (
      <img 
        src={UserAvatarSvg} 
        alt="no-members" 
        style={{ fontSize: '2rem', height:'2rem' }} 
      />
    )}

    {/* -------- אדם אחד -------- */}
    {count === 1 && selectedPeople.map(x => {
      const letter = x.name.charAt(0).toUpperCase();
      return (
        <div 
          key={x._id}
          title={x.name}
          style={styles.iconUserSingle}
        >
          {letter}
        </div>
      );
    })}

    {/* -------- שני אנשים -------- */}
    {count === 2 && selectedPeople.map(x => {
      const letter = x.name.charAt(0).toUpperCase();
      return (
        <div 
          key={x._id}
          title={x.name}
          style={styles.iconUser2people}
        >
          {letter}
        </div>
      );
    })}

    {/* -------- יותר משני אנשים -------- */}
    {count > 2 && (
      <>
        {/* הראשון */}
        <div 
          title={selectedPeople[0].name}
          style={styles.iconUserGt2_first}
        >
          {selectedPeople[0].name.charAt(0).toUpperCase()}
        </div>

        {/* השני = +כמה נוסף */}
        <div 
          style={styles.iconUserGt2_rest}
        >
          +{count - 1}
        </div>
      </>
    )}
  </div>


    </div> 
    );

  }
const styles = {
  iconUserSingle:{
            width: '28px',
            height: '28px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            marginRight: '4px'
          },
  iconUser2people:{
            width: '28px',
            height: '28px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            marginRight: '-6px'
          },
  iconUserGt2_first:{
            width: '28px',
            height: '28px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            marginRight: '-6px'
          },
  iconUserGt2_rest:{
            width: '28px',
            height: '28px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold'
          }



}