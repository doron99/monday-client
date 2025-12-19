import BoardPreviewSvg from '../assets/svgs/board-preview.svg';
import { RiLayoutGridFill } from "react-icons/ri";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { toggleBoardStar } from '../store/actions/user.actions.js'
import { loadBoards } from '../store/actions/board.actions.js'

export function BoardPreview({ boardPreview }) {
    const navigate = useNavigate();
    
    const toggleStar = async (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        console.log('Toggle star for board:', boardPreview._id);
        
        try {
            // Call the user action to toggle board star
            await toggleBoardStar(boardPreview._id)
            // Reload boards to sync UI with backend state
            await loadBoards()
        } catch (err) {
            console.error('Failed to toggle favorite:', err)
        }
    };

    // נתיב דינמי - אם יש לך מידע על workspace/team תוכל להוסיף כאן
    const breadcrumb = "monday dev > workspace";

    return (
        <div 
            className='board-preview' 
            onClick={() => navigate(`/board/${boardPreview._id}`)}
        >
            <div className="board-preview-image-container">
                <img className='board-preview-image' src={BoardPreviewSvg} alt={boardPreview.title} />
            </div>
            
            <div className='board-preview-content'>
                <div className='board-preview-header'>
                    <div className='board-preview-title-section'>
                        <RiLayoutGridFill className="board-preview-icon" />
                        <span className='board-preview-title'>{boardPreview.title}</span>
                    </div>
                    <div 
                        className='board-star-button'
                        onClick={toggleStar}
                    >
                        {boardPreview.isStarred 
                            ? <FaStar className="star-icon starred" /> 
                            : <FaRegStar className="star-icon" />
                        }
                    </div>
                </div>
                
                <div className='board-breadcrumb'>
                    <span>{breadcrumb}</span>
                </div>
            </div>
        </div>
    );
}