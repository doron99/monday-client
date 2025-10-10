import { useDispatch, useSelector } from 'react-redux'


export function BoardList() {
    const isDev = useSelector(storeState => storeState.devToolModule.isDev)
    const list = [{id:'',name:'asdas'},{id:'',name:'ssss'},{id:'',name:'dddd'},{id:'',name:'asdas'},{id:'',name:'ssss'},{id:'',name:'dddd'},{id:'',name:'asdas'},{id:'',name:'ssss'},{id:'',name:'dddd'}]
    return (
        <div className='board-details'>
            sdfsd
        
        <div  style={{
            display:'grid',
            gridTemplateColumns:'auto auto auto',
            gap:'20px',padding:'30px'
            }} >
            {list.map(x => {
                return <div style={styles.gridItem}>
                    x.name
                </div>
            })}
        </div>
        </div>
    )
}
const styles = {
    gridItem:{
        background:'blue'
    }
}