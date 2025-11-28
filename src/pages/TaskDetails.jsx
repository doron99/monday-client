import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { PiUserCircleThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { makeId, getRandomColor } from "../services/util.service.js";
import { updateBoard } from "../store/actions/board.actions";

export function TaskDetails(){
    const {boardId,taskId} = useParams();
    const [activeTab, setActiveTab] = useState('updates');

    const [rightPosition, setRightPosition] = useState('0');
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const selectedBoard = useSelector(state => state.boardModule.selectedBoard);
    const [comments, setComments] = useState(null);
    const [groupId, setGroupId] = useState(null);
    const [taskTitle, setTaskTitle] = useState(null);
    useEffect(() => {
        if (selectedBoard) {
//get comments
        const groupIdAndTaskId = findGroupAndTaskByTaskId(taskId);
        setGroupId(groupIdAndTaskId.group.id)
        const _comments = groupIdAndTaskId.task.comments;//['tasks'].find(t => t.id == taskId);
        setTaskTitle(groupIdAndTaskId.task.taskTitle)
        // Sort comments by createdAt field in descending order
        const sortedComments = _comments.sort((a, b) => b.createdAt - a.createdAt);
        setComments(sortedComments);
        }
        
    },[selectedBoard,taskId])
    const findGroupAndTaskByTaskId = (taskId) => {
    for (const group of selectedBoard.groups) {
        const task = group.tasks.find((task) => task.id === taskId);
        if (task) {
            return { task, group }; // Return both the found task and its group
        }
    }
    return null; // Return null if the task is not found
};

    const navigate = useNavigate();
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
    const [updates, setUpdates] = useState([]);
    const [newUpdate, setNewUpdate] = useState('');

    const handleUpdateChange = (e) => {
        setNewUpdate(e.target.value);
    };
    const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        if (newUpdate.trim()) {
            const newComment = {
                "id": makeId(),
                "title": newUpdate,
                "createdAt": new Date().getTime(),
                "byMember": {
                  "_id": "u100",
                  "name": "Doron test"
                }
            }
            const newDetails = [...comments,newComment]
            //const userIds = selectedPeople.map(u => u._id)
            //console.log('members updated',selectedPeople,userIds)
            //console.log('handleMembersSelect',content.groupId, content.taskId, { key:'members', value:userIds });
            console.log(groupId, taskId, { key:'comments', value:newDetails })
            updateBoard(groupId, taskId, { key:'comments', value:newDetails });
            //onClose();

            // Add new update to the updates array
            //setUpdates([...updates, { user: 'Guest', text: newUpdate, time: 'Just now' }]);
            setNewUpdate('');
        }
    };
    const dateFormat = (timestamp) => {
        const date = new Date(timestamp);

        // Format the date
        const formattedDate = 
    `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        return formattedDate;
    } 
  
    return(
        <div className="task-details-container" style={{ ...styles.mainStyle, right: rightPosition }}>
            
            <div><span className="task-details-x-button" style={{ fontSize: '1rem', 
                marginRight: '0.5rem',
                padding:'0.3rem',cursor:'pointer' }} onClick={() => onClickX()}>✕</span></div>
            <h2>{taskTitle}</h2>
            
            <div className="tab-bar">
                <button
                onClick={() => handleTabClick('updates')}
                className={activeTab === 'updates' ? 'active-tab' : ''}
                >
                Updates
                </button>
                <button
                onClick={() => handleTabClick('activityLog')}
                className={activeTab === 'activityLog' ? 'active-tab' : ''}
                >
                Activity Log
                </button>
            </div>
            <div className="tab-bar-hr"></div>
            
            <div className="tab-content">
                {activeTab === 'updates' ? (
                    <div>
                        {/*------------------------------ 
                        ---------------updates-----------
                        ------------------------------*/}
                        <form className="task-details-form" onSubmit={handleUpdateSubmit}>
                            <input 
                                type="text" 
                                value={newUpdate} 
                                onChange={handleUpdateChange} 
                                placeholder="Write an update..." 
                            />
                            <button type="submit">Update</button>
                        </form>
                        <div className="updates" style={{width:'100%'}}>
                            {comments && comments.map((comment, index) => (
                                <div key={index} className="update-item">
                                    <div className="update-user" style={{display:'flex',justifyContent:'space-between',textAlign:'center'}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <PiUserCircleThin style={{ fontSize: '1.4rem', marginRight: '0.5rem' }} />
                                            {comment.byMember.name}
                                        </div>
                                        <span className="time">{dateFormat(comment.createdAt)}</span></div>
                                    <div className="update-text">{comment.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                <div>
                    {/*------------------------------ 
                    ---------------activity log-----------
                     ------------------------------*/}
                    <h3>Activity Log</h3>
                    <p>No activity logged yet.</p>
                </div>
                )}
            </div>
            
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
