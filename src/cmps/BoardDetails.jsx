import { useDispatch, useSelector } from 'react-redux'


export function BoardDetails() {
    const isDev = useSelector(storeState => storeState.devToolModule.isDev)

    return (
        <div style={{height:'100vh',width:'100%',background:'#e1e1e1'}}>
            board details
        </div>
           
          
    )
}
