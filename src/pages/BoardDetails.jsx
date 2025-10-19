import { useEffect, useState } from "react";
import { BoardHeader } from "../cmps/BoardHeader.jsx";
import { useParams, Outlet } from "react-router";
import { GroupPreview } from "../cmps/GroupPreview.jsx";
import { makeId, getRandomColor } from "../services/util.service.js";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { updateBoard, loadBoardById } from "../store/actions/board.actions.js";
import { boardActions } from "../store/actions/board.actions.js";
import { useEffectUpdate } from "../cmps/customHooks/useEffectUpdate.js";

export function BoardDetails() {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filteredBoard,setFilteredBoard] = useState(null)
  const board = useSelector(state => {
    //doron fix:
    return state.boardModule.selectedBoard;
  });
  const filterBy = useSelector(state => state.boardModule.filterBy);
  const isDev = useSelector(storeState => storeState.devToolModule.isDev)
  const { boardId } = useParams();
  const [labels,setLabels] = useState(null)//labels represent cmpOrders




  useEffect(() => {
        console.log('filterBy changed', filterBy);
        if (board) {
          setFilteredBoard(boardActions.filterBoard(board, filterBy));
          setLabels(board?.cmpOrder)
        }
        
    }, [filterBy, board]); // Ensure board is a dependency as well

    useEffect(() => {
        loadBoardById(boardId)
            .then((loadedBoard) => {
                console.log("Board loaded:", loadedBoard);
                // Assuming you want to directly set the board here after loading
                setFilteredBoard(loadedBoard); // Set loaded board instead of just logging
            })
            .catch((err) => console.error("Error fetching board:", err));
    }, [boardId]);

  function toggleSelectedTask(groupId, taskId) {
    console.log(groupId, taskId);
    // const groupIdx = board.groups.findIndex((g) => g.id === groupId);
    // const task = board.groups[groupIdx].tasks.filter((t) => t.id === taskId);

    // setSelectedTasks((state) => {
    //   if (state.includes(task[0].id)) {
    //     return state.filter((t) => t.taskId !== task[0].id);
    //   } else {
    //     return [
    //       ...state,
    //       { taskId: task[0].id, color: board.groups[groupIdx].style.color },
    //     ];
    //   }
    // });
  }

  // function updateBoard(groupId, taskId, changes) {
  //   //! This is just for demonstation. in the real project store will call this fucntion to make the board reactive with changes from taskDetails
  //   // we will use action to update the board in store and useSelector will reflect the change
  //   const updatedBoard = boardService.updateBoard(board,groupId,taskId,changes);
  //   saveBoard(updatedBoard)
  //     .then(savedBoard => {
  //       console.log("Board saved successfully:", savedBoard);
  //     })
  //     .catch(err => {
  //       console.error("Error saving board:", err);
  //     });
  // }

  function addNewGroup() {    
    if (!board) {
      console.error("No board found!");
      return;
    }
    
    const newGroup = {
        "id": makeId(),
        "title": "New Group",
        "tasks": [],
        "style": {
          "color": getRandomColor()
        }
      }

      const groupArr = [...board.groups, newGroup];
      updateBoard(null, null, {key: 'groups', value: groupArr});
  }

  const uid = () => Math.random().toString(36).slice(2);

  const progress = [null, null, "status", "priority", null, "date"];



  return (
    <div className="board-details">
      {isDev && <pre>{JSON.stringify(board.groups,null,2)}</pre>}
      <div style={{display:'flex'}}>
        <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
          <BoardHeader />
          <section className="group-list">
            {filteredBoard &&
              filteredBoard.groups.map((group) => (
                <div key={group.id}>
                  <GroupPreview
                    group={group}
                    labels={labels}
                    cmpOrder={filteredBoard.cmpOrder}
                    progress={progress}
                    toggleSelectedTask={toggleSelectedTask}
                    selectedTasks={selectedTasks}
                    board={filteredBoard}
                  />
                </div>
              ))}
            <div className="add-group-section">
              <button className="add-group-btn" onClick={addNewGroup}>
                <PlusIcon style={{ width: "20px", height: "20px", color: "#3c3c3f" }}/>
                <span>Add new group</span>
              </button>
            </div>
          </section>
      </div>
      {/* Outlet for TaskDetails modal */}
      <Outlet />
    </div>
      

      
  </div>
  );
}