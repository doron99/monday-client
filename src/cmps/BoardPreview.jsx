import BoardPreviewSvg from '../assets/svgs/board-preview.svg';
import { LuPanelLeft } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router';

export function BoardPreview({boardPreview,toggleStar}) {
    //const isDev = useSelector(storeState => storeState.devToolModule.isDev)
    const navigate = useNavigate();
    const toggleStarInner = (ev,id) => {
        ev.preventDefalt();
        console.log(id)
    }
    return (
        <div className='board-preview' 
        onClick={() => navigate(`/board/${boardPreview._id}`)}>
            <img className='img-cover' src={BoardPreviewSvg}  />
            <div className='board-preview-details'>
                <div className='board-preview-details-left'>
                    <LuPanelLeft style={styles.constSize}/>
                    <span style={styles.boardNameStyle}>{boardPreview.title}</span>
                </div>
                <div style={{zIndex:'3'}}
                    onClick={() => toggleStarInner(boardPreview.id)} 
                    className='board-preview-details-right'>
                {!boardPreview.isStarred 
                    ? <FaRegStar style={styles.constSize} /> 
                    : <FaStar style={styles.selectedStar} />}
                </div>
                

            </div>
            
        </div>
          
    )
}
const styles ={
    constSize:{fontSize: '1.2rem', color:'#4a4a4a' },
    boardNameStyle:{fontWeight:'600',fontSize:'1.1rem', marginLeft:'10px', color:'#2d2d2d'},
    selectedStar:{ fontSize: '1.2rem', color: '#ffcb00' }
}