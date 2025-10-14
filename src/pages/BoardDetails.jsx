//import { boardService } from "../services/board.service.js";
import { useEffect, useState } from "react";
import { BoardHeader } from "../cmps/BoardHeader.jsx";
import { useParams, Outlet } from "react-router";
import { GroupPreview } from "../cmps/GroupPreview.jsx";
import { boardService } from "../services/board.service.js";
// import { useDispatch, useSelector } from "react-redux";
import {loadBoardById, saveBoard} from '../store/actions/board.actions.js'



export function BoardDetails() {
//const [board, setBoard] = useState(null);
const [selectedTasks, setSelectedTasks] = useState([]);
const [board,setBoard] = useState(null);
const {boardId} = useParams()
useEffect(() => {
  
  loadBoardById(boardId)
    .then(res => {
      console.log(res);
      setBoard(res);
    })
    .catch(err => console.error('Error fetching board:', err));
}, []);

// useEffect(() => {
//   console.log('useEffect');

//   boardService.getById('b101').then(res => {
//     console.log(res);
//     setBoard(res)
//   })
// },[])
//   const [isFooterDisplayed, setisFooterDisplayed] = useState(false);


//   useEffect(() => {
//     console.log("board details mounted");

//     if (!board) return;
//     // setGroupsByTastks();
//   }, [board]);

//   useEffect(() => {
//     if (selectedTasks.length) {
//       setisFooterDisplayed(true);
//     } else {
//       setisFooterDisplayed(false);
//     }
//   }, [selectedTasks]);

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

  // useEffect(() => {
  //   console.log('in use effect');
  //   loadBoard();
  // }, []);

  // useEffect(() => {}, [groupsMap]);

  function updateBoard(groupId, taskId, changes) {
    console.log('BoardDetails -> updateBoard', groupId, taskId, changes);
    //! This is just for demonstation. in the real project store will call this fucntion to make the board reactive with changes from taskDetails
    // we will use action to update the board in store and useSelector will reflect the change
    const updatedBoard = boardService.updateBoard(
      board,
      groupId,
      taskId,
      changes
    );
    saveBoard(updatedBoard);
    console.log('###############',updatedBoard);
    setBoard(prev => prev = updatedBoard);
  }

  // async function loadBoard() {
  //   const board = await boardService.getById(boardId);
  //   setBoard(board);
    
  //   console.log('loaded');
  // }

  const uid = () => Math.random().toString(36).slice(2);
  const labels = [null, "task", "status", "priority", "date", "members"];

  const progress = [null, null, "status", "priority", null, "date"];

//   if (!board)
//     return (
//       <>
//         <h1>Loading... </h1>{" "}
//       </>
//     );

  return (
    <div className="board-details">
      <BoardHeader />
      <section className="group-list">
        {board && board.groups.map((group) => (
          <GroupPreview
            group={group}
            labels={labels}
            cmpOrder={board.cmpOrder}
            progress={progress}
            updateBoard={updateBoard}
            toggleSelectedTask={toggleSelectedTask}
            selectedTasks={selectedTasks}
            key={uid()}
          />
        ))}
      </section>
      
      {/* Outlet for TaskDetails modal */}
      <Outlet />
    </div>
  );
};

