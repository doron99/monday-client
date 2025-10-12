//import { boardService } from "../services/board.service.js";
import { useEffect, useState } from "react";
import { BoardHeader } from "../cmps/BoardHeader.jsx";
import { useParams, Outlet } from "react-router";
import { GroupPreview } from "../cmps/GroupPreview.jsx";
// import { useDispatch, useSelector } from "react-redux";


const boardDemo =   {
    "_id": "b101",
    "title": "Robot dev proj",
    "isStarred": false,
    "archivedAt": 1589983468418,
    "createdBy": {
      "_id": "u101",
      "fullname": "Abi Abambi",
      "imgUrl": "http://some-img"
    },
    "style": {
      "color": "red"
    },
    "labels": [
      {
        "id": "l101",
        "title": "Done",
        "color": "#61bd4f"
      },
      {
        "id": "l102",
        "title": "Progress",
        "color": "#61bd33"
      }
    ],
    "members": [
      {
        "_id": "u101",
        "fullname": "Tal Taltal",
        "imgUrl": "https://www.google.com"
      },
      {
        "_id": "u102",
        "fullname": "Josh Ga",
        "imgUrl": "https://www.google.com"
      }
    ],
    "groups": [
      {
        "id": "g101",
        "title": "Group 1",
        "archivedAt": 1589983468418,
        "tasks": [
          {
            "id": "t101",
            "side": "left",
            "taskTitle": "Replace logo",
            "status": "notStarted",
            "priority": "low",
            "members": [],
            "date": null
          },
          {
            "id": "t102",
            "side": "left",
            "taskTitle": "Add Samples",
            "status": "notStarted",
            "priority": "low",
            "members": [],
            "date": null
          }
        ],
        "style": {
          "color": "red"
        }
      },
      {
        "id": "g102",
        "title": "Group 2",
        "tasks": [
          {
            "id": "t103",
            "side": "right",
            "taskTitle": "Do that",
            "status": "archived",
            "priority": "low",
            "members": [],
            "date": null
          },
          {
            "id": "t104",
            "side": "right",
            "taskTitle": "Help me",
            "status": "inProgress",
            "priority": "high",
            "members": ["u101"],
            "date": "2024-09-24"
          }
        ],
        "style": {
          "color": "#61bd33"
        }
      }
    ],
    "activities": [],
    "cmpOrder": ["side", "taskTitle", "status", "priority", "date", "members"]
  }


export function BoardDetails() {
//const [board, setBoard] = useState(null);
const [selectedTasks, setSelectedTasks] = useState([]);
//   const [isFooterDisplayed, setisFooterDisplayed] = useState(false);

  const { boardId } = useParams();
  console.log(boardId);

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
    console.log(groupId, taskId, changes);
    //! This is just for demonstation. in the real project store will call this fucntion to make the board reactive with changes from taskDetails
    // we will use action to update the board in store and useSelector will reflect the change
    // const updatedBoard = boardService.updateBoard(
    //   board,
    //   groupId,
    //   taskId,
    //   changes
    // );
    // setBoard(updatedBoard);
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
        {boardDemo.groups.map((group) => (
          <GroupPreview
            group={group}
            labels={labels}
            cmpOrder={boardDemo.cmpOrder}
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

