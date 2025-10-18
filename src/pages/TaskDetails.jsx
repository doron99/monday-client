import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';

export function TaskDetails(){
    const [rightPosition, setRightPosition] = useState('0');
    const navigate = useNavigate();
    const {boardId} = useParams();
     useEffect(() => {
        // Set the right position to 500 when the component mounts
        const timer = setTimeout(() => {
            setRightPosition('500px');
        }, 500);  // Slight delay to trigger the transition

        return () => clearTimeout(timer); // Cleanup timer if component unmounts
    }, []);
    const onClickX = () => {
        navigate(`/board/${boardId}`);//, { replace: true }); // Adjust the URL as needed

    }
    return(
        <div style={{ ...styles.mainStyle, right: rightPosition }}>
            <FaTimes onClick={() => onClickX()}/>

            <br/>
            Task Details Page
        </div>
    );
}
const styles = {
    mainStyle:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Use 'flex-start' instead of 'start'
    position: 'fixed',
    top: '50px',
    right: '0',
    width: '500px',
    height: '100%',
    backgroundColor: '#fff',
    padding: '20px',
    overflow: 'auto',
    boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)', // RGBA for transparency
    transform: 'translate(100%)',
    transition: 'right 0.5s ease-in-out',
    zIndex: 9999
}
};
