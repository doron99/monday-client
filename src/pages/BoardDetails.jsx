import { useEffect, useState } from "react";
import { BoardHeader } from "../cmps/BoardHeader.jsx";
import { useParams, Outlet } from "react-router";
import { GroupPreview } from "../cmps/GroupPreview.jsx";
import { boardService } from "../services/board.service.js";
import { makeId, getRandomColor } from "../services/util.service.js";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { loadBoardById, saveBoard } from "../store/actions/board.actions.js";

export function BoardDetails() {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const board = useSelector(state => {
    return state.boardModule.selectedBoard;
  });
  const { boardId } = useParams();
  
  useEffect(() => {
    loadBoardById(boardId)
      .then(loadedBoard => {
        console.log("Board loaded:", loadedBoard);
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

  function updateBoard(groupId, taskId, changes) {
    //! This is just for demonstation. in the real project store will call this fucntion to make the board reactive with changes from taskDetails
    // we will use action to update the board in store and useSelector will reflect the change
    const updatedBoard = boardService.updateBoard(board,groupId,taskId,changes);
    saveBoard(updatedBoard)
      .then(savedBoard => {
        console.log("Board saved successfully:", savedBoard);
      })
      .catch(err => {
        console.error("Error saving board:", err);
      });
  }

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
        {board &&
          board.groups.map((group) => (
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
        <div className="add-group-section">
          <button className="add-group-btn" onClick={addNewGroup}>
            <PlusIcon style={{ width: "20px", height: "20px", color: "#676879" }}/>
            <span>Add new group</span>
          </button>
        </div>
      </section>

      {/* Outlet for TaskDetails modal */}
      <Outlet />
    </div>
  );
}
