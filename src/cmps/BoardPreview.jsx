import BoardPreviewSvg from '../assets/svgs/board-preview.svg';
import { LuPanelLeft } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export function BoardPreview({boardPreview,toggleStar}) {
    //const isDev = useSelector(storeState => storeState.devToolModule.isDev)
    return (
        <div className='board-preview'>
            <img className='img-cover' src={BoardPreviewSvg}  />
            <div className='board-preview-details'>
                <div className='board-preview-details-left'>
                    <LuPanelLeft style={styles.constSize}/>
                    <span style={styles.boardNameStyle}>{boardPreview.name}</span>
                </div>
                <div 
                    onClick={() => toggleStar(boardPreview.id)} 
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
    constSize:{fontSize: '1.5rem' },
    boardNameStyle:{fontWeight:'bold',fontSize:'1.5rem', marginLeft:'10px'},
    selectedStar:{ fontSize: '1.5rem', color: '#ffcb00' }
}