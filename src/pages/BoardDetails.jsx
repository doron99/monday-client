import { useEffect, useState } from "react";
import { BoardHeader } from "../cmps/BoardHeader.jsx";
import { useParams, Outlet } from "react-router";
import { GroupPreview } from "../cmps/GroupPreview.jsx";
import { makeId, getRandomColor } from "../services/util.service.js";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { updateBoard, loadBoardById } from "../store/actions/board.actions.js";
import { boardActions } from "../store/actions/board.actions.js";
import { TasksSelectedModal } from "../cmps/TasksSelectedModal.jsx";
import { DeleteConfirmationModal } from "../cmps/DeleteConfirmationModal.jsx";
import { MoveToConfirmationModal } from "../cmps/MoveToConfirmationModal.jsx";
import { ArchiveConfirmationModal } from "../cmps/ArchiveConfirmationModal.jsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export function BoardDetails() {

  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMoveToModal, setShowMoveToModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const board = useSelector((state) => {
    return state.boardModule.selectedBoard;
  });
  const filterBy = useSelector(state => state.boardModule.filterBy);
  const isDev = useSelector(storeState => storeState.devToolModule.isDev)
  const { boardId } = useParams();

  useEffect(() => {
    loadBoardById(boardId)
      .then((loadedBoard) => {
        console.log("Board loaded:", loadedBoard);
      })
      .catch((err) => console.error("Error fetching board:", err));
  }, [boardId]);

  function unselectAll() {
    setSelectedTasks([]);
  }

  async function handleUpdateBoard(gid, tid, update) {
  try {
    const updatedBoard = await updateBoard(gid, tid, update);
    console.log("✅ Board updated:", updatedBoard);
    return updatedBoard;
  } catch (err) {
    console.error("❌ Error updating board:", err);
    throw err;
  }
}


  function onAction(actionType) {
    console.log('Action triggered:', actionType, 'on tasks:', selectedTasks);
    
    switch (actionType) {
      case 'duplicate':
        handleDuplicateTasks();
        break;
      case 'export':
        handleExportTasks();
        break;
      case 'archive':
        handleArchiveTasks();
        break;
      case 'delete':
        handleDeleteTasks();
        break;
      case 'move':
        handleMoveTasks();
        break;
      default:
        console.warn('Unknown action type:', actionType);
    }
  }

  function handleDuplicateTasks() {
    if (!selectedTasks.length) return;
    
    console.log('handleDuplicateTasks tasks:', selectedTasks);

    // Create a deep copy of the groups array to avoid mutating the original
    const updatedGroups = board.groups.map(group => ({ ...group, tasks: [...group.tasks] }));
    
    // Iterate over each selected task and remove it from its corresponding group
    selectedTasks.forEach((selectedTask, index) => {
      console.log(`Task ${index + 1}: taskId = ${selectedTask.taskId}, groupId = ${selectedTask.groupId}`);
      
      // Find the group that contains this task
      const groupIndex = updatedGroups.findIndex(group => group.id === selectedTask.groupId);
      
      
      if (groupIndex !== -1) {
        const currTask = JSON.parse(JSON.stringify(
          updatedGroups[groupIndex].tasks.find(task => task.id == selectedTask.taskId)
        ));
        currTask.id = makeId();
        updatedGroups[groupIndex].tasks.push(currTask);
       
      }
    });
    
    const update = { key: "groups", value: updatedGroups }
    updateBoard(null, null, update)
  
    unselectAll();
  }

  function handleExportTasks() {
    if (!selectedTasks.length) return;
    const arrToExcel = [];
    // Create a deep copy of the groups array to avoid mutating the original
    const updatedGroups = board.groups.map(group => ({ ...group, tasks: [...group.tasks] }));
    
    // Iterate over each selected task and remove it from its corresponding group
    selectedTasks.forEach((selectedTask, index) => {
      console.log(`Task ${index + 1}: taskId = ${selectedTask.taskId}, groupId = ${selectedTask.groupId}`);
      
      // Find the group that contains this task
      const groupIndex = updatedGroups.findIndex(group => group.id === selectedTask.groupId);
      
      
      if (groupIndex !== -1) {
        arrToExcel.push(updatedGroups[groupIndex].tasks.find(task => task.id == selectedTask.taskId))
       
        //updatedGroups[groupIndex].tasks.push(currTask);
       
      }
    });
    
    //const update = { key: "groups", value: updatedGroups }
    console.log('arrToExcel',arrToExcel)
    exportToExcel(arrToExcel)


  }

  function handleArchiveTasks() {
    if (!selectedTasks.length) return;
    setShowArchiveModal(true);
  }

  function handleDeleteTasks() {
    if (!selectedTasks.length) return;
    setShowDeleteModal(true);
  }

  function confirmMoveToTasks(targetGroupId) {
    console.log('confirmMoveToTasks targetGroupId:', targetGroupId);
    //logic
    // Create a deep copy of the groups array to avoid mutating the original
    const updatedGroups = board.groups.map(group => ({ ...group, tasks: [...group.tasks] }));
    
    //get target group index
    const targetGroupIndex = updatedGroups.findIndex(group => group.id === targetGroupId);

    // Iterate over each selected task and remove it from its corresponding group
    selectedTasks.forEach((selectedTask, index) => {
      console.log(`Task ${index + 1}: taskId = ${selectedTask.taskId}, groupId = ${selectedTask.groupId}`);
      
      // Find the group that contains this task
      const groupIndex = updatedGroups.findIndex(group => group.id === selectedTask.groupId);
      
      if (groupIndex !== -1 && groupIndex != targetGroupIndex) {
        // get task object
        const taskToMove = updatedGroups[groupIndex].tasks.find(task => task.id == selectedTask.taskId);
        // add the task to target group
        updatedGroups[targetGroupIndex].tasks.push(taskToMove);
        // Remove the task from this group's tasks array
        updatedGroups[groupIndex].tasks = updatedGroups[groupIndex].tasks.filter(
          task => task.id !== selectedTask.taskId
        );
        //console.log(`Removed task ${selectedTask.taskId} from group ${selectedTask.groupId}`);
      }
    });
    
    const update = { key: "groups", value: updatedGroups }
    updateBoard(null, null, update)

    setShowMoveToModal(false);
    unselectAll();
    return;

  }
  function confirmDeleteArchiveTasks(deleteOrArchive) {
    console.log('confirmDeleteArchiveTasks tasks:', selectedTasks, 'action:',deleteOrArchive);

    // Create a deep copy of the groups array to avoid mutating the original
    const updatedGroups = board.groups.map(group => ({ ...group, tasks: [...group.tasks] }));
    
    // Iterate over each selected task and remove it from its corresponding group
    selectedTasks.forEach((selectedTask, index) => {
      console.log(`Task ${index + 1}: taskId = ${selectedTask.taskId}, groupId = ${selectedTask.groupId}`);
      
      // Find the group that contains this task
      const groupIndex = updatedGroups.findIndex(group => group.id === selectedTask.groupId);
      
      if (groupIndex !== -1) {
        const currTask = updatedGroups[groupIndex].tasks.find(task => task.id == selectedTask.taskId)
        // Remove the task from this group's tasks array
        if (deleteOrArchive == 'delete') {
          currTask.isDeleted = true;

        } else {
          currTask.isArchived = true;
        }
        //this is the first logic was
        // updatedGroups[groupIndex].tasks = updatedGroups[groupIndex].tasks.filter(
        //   task => task.id !== selectedTask.taskId
        // );
        console.log(`Removed task ${selectedTask.taskId} from group ${selectedTask.groupId}`);
      }
    });
    
    const update = { key: "groups", value: updatedGroups }
    updateBoard(null, null, update)
    if (deleteOrArchive == 'delete') {
      setShowDeleteModal(false);

    } else {
      setShowArchiveModal(false);

    }
    unselectAll();
  }

  function cancelDeleteTasks() {
    setShowDeleteModal(false);
  }
   function cancelArchiveTasks() {
    setShowArchiveModal(false);
  }
  function cancelMoveToTasks() {
    setShowMoveToModal(false);
  }
  function handleMoveTasks() {
    if (!selectedTasks.length) return;
    
    console.log('Moving tasks:', selectedTasks);
    setShowMoveToModal(true);
    // TODO: Implement task move logic (show group selector modal)
    //alert(`Moving ${selectedTasks.length} task(s)`);
  }

  function toggleSelectedTask(groupId, taskId) {
    console.log(groupId, taskId);
    const groupIdx = board.groups.findIndex((g) => g.id === groupId);
    const task = board.groups[groupIdx].tasks.filter((t) => t.id === taskId);

    console.log(groupIdx, task[0].id);

    setSelectedTasks((selectedTasks) => {
      // Check if task is already selected by comparing taskId property in objects
      const isAlreadySelected = selectedTasks.some(selectedTask => selectedTask.taskId === task[0].id);
      
      if (isAlreadySelected) {
        console.log('already includes');
        const updateSelectedTasks = selectedTasks.filter((t) => t.taskId !== task[0].id);
        return updateSelectedTasks;
      } else {
        console.log('not includes');
        const updatedTasks = [
          ...selectedTasks,
          { taskId: task[0].id, groupId },
        ];
        console.log(updatedTasks);
        return updatedTasks;
      }
    });
  }

  function addNewGroup() {
    if (!board) {
      console.error("No board found!");
      return;
    }

    const newGroup = {
      id: makeId(),
      title: "New Group",
      tasks: [],
      style: {
        color: getRandomColor(),
      },
    };

    const groupArr = [...board.groups, newGroup];
    updateBoard(null, null, { key: "groups", value: groupArr });
  }

  const uid = () => Math.random().toString(36).slice(2);
  const labels = [null, "task", "status", "priority", "date", "members"];
  const progress = [null, null, "status", "priority", null, "date"];

  const exportToExcel = (jsonData, fileName = "data.xlsx") => {
    // המרה של אובייקטים ל־Sheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // יצירת Workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // המרה לבינארי
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // הורדת הקובץ
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  const boardToDisplay = boardActions.filterBoard(board, filterBy)

  return (
    <div className="board-details">
      {isDev && JSON.stringify(filterBy,null,2)}
      <div>
         {/* <pre>
        {JSON.stringify(boardToDisplay, null, 2)}
        </pre>  */}
        <div>
          <BoardHeader board={board} onUpdateBoard={handleUpdateBoard} />
          <section className="group-list">
            {boardToDisplay &&
              boardToDisplay.groups.map((group) => (
                <GroupPreview
                  group={group}
                  labels={board.cmpOrder}
                  cmpOrder={board.cmpOrder}
                  progress={progress}
                  toggleSelectedTask={toggleSelectedTask}
                  selectedTasks={selectedTasks}
                  board={board} // ask tal
                  key={uid()}
                />
              ))}
            <div className="add-group-section">
              <button className="add-group-btn" onClick={addNewGroup}>
                <PlusIcon
                  style={{ width: "20px", height: "20px", color: "#3c3c3f" }}
                />
                <span>Add new group</span>
              </button>
            </div>
          </section>
        </div>
        {/* Outlet for TaskDetails modal */}
        <Outlet />
      </div>

      {selectedTasks.length > 0 && <TasksSelectedModal selectedCount={selectedTasks.length} onClose={unselectAll} onAction={onAction}/>}
      
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={cancelDeleteTasks}
        onConfirm={() => confirmDeleteArchiveTasks('delete')}
        taskCount={selectedTasks.length}
      />

      <ArchiveConfirmationModal
        isOpen={showArchiveModal}
        onClose={cancelArchiveTasks}
        onConfirm={() => confirmDeleteArchiveTasks('archive')}
        taskCount={selectedTasks.length}
      />
      {boardToDisplay && boardToDisplay.groups &&<MoveToConfirmationModal
        groups={boardToDisplay.groups}
        isOpen={showMoveToModal}
        onClose={cancelMoveToTasks}
        onConfirm={confirmMoveToTasks}
        taskCount={selectedTasks.length}
      />}
    </div>
  );
}