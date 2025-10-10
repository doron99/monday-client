import { useDispatch, useSelector } from 'react-redux'
import boards from "../assets/data/data.json";
import BoardPreview from '../assets/svgs/board-preview.svg';
import { LuPanelLeft } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FiCodepen } from "react-icons/fi";

import { useState } from 'react';

export function BoardList() {
    const src = new URL(`../assets/svgs/board-preview.svg`, import.meta.url).href;

    const isDev = useSelector(storeState => storeState.devToolModule.isDev)
    const [list, setList] = useState([{id:'',name:'Board 0',isStarred:false},
        {id:'1',name:'Board 1',isStarred:false},
        {id:'2',name:'Board 2',isStarred:true},
        {id:'3',name:'Board 3',isStarred:true},
        {id:'4',name:'ssss',isStarred:true},
        {id:'5',name:'dddd',isStarred:false},
        {id:'6',name:'asdas',isStarred:false},
        {id:'7',name:'ssss',isStarred:false},
        {id:'8',name:'dddd',isStarred:false}]);

    const toggleStar = (id) => {
    setList(prevList =>
        prevList.map(item =>
            item.id === id ? { ...item, isStarred: !item.isStarred } : item
        )
        );
    };
    return (
        <div className='board-list-container' >
            <div className='board-list'  >
                {list.map(x => {
                    return <div className='board-list-item'>
                        <img className='img-cover' src={BoardPreview}  />
                        <div className='board-list-item-details'>
                            <div style={styles.itemDetailsLeftSide}>
                                <LuPanelLeft style={styles.constSize}/>
                                <span style={styles.boardNameStyle}>{x.name}</span>
                            </div>
                            <div 
                                onClick={() => toggleStar(x.id)} 
                                style={styles.itemDetailsRightSide}>
                            {!x.isStarred 
                                ? <FaRegStar style={styles.constSize} /> 
                                : <FaStar style={styles.selectedStar} />}
                            </div>
                            

                        </div>
                       
                    </div>
                })}
            </div>
        </div>
    )
}
const styles ={
    constSize:{fontSize: '1.5rem' },
    boardNameStyle:{fontWeight:'bold',fontSize:'1.5rem', marginLeft:'10px'},
    itemDetailsLeftSide:{display:'flex',alignItems:'center'},
    itemDetailsRightSide:{ cursor: 'pointer' },
    selectedStar:{ fontSize: '1.5rem', color: '#ffcb00' }
}