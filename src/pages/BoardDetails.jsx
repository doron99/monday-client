import { useEffect, useState } from "react";
import { BoardHeader } from "../cmps/BoardHeader.jsx";
import { useParams, Outlet } from "react-router";
import { GroupPreview } from "../cmps/GroupPreview.jsx";
import { makeId, getRandomColor } from "../services/util.service.js";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { updateBoard, loadBoardById } from "../store/actions/board.actions.js";
import { TasksSelectedModal } from "../cmps/TasksSelectedModal.jsx";
import { DeleteConfirmationModal } from "../cmps/DeleteConfirmationModal.jsx";

export function BoardDetails() {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const board = useSelector((state) => {
    return state.boardModule.selectedBoard;
  });
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
    
    console.log('Duplicating tasks:', selectedTasks);
    // TODO: Implement task duplication logic
    // For each selected task, create a copy and add it to the same group
    // alert(`Duplicating ${selectedTasks.length} task(s)`);
    // unselectAll();
  }

  function handleExportTasks() {
    if (!selectedTasks.length) return;
    
    console.log('Exporting tasks:', selectedTasks);
    // TODO: Implement task export logic (CSV, JSON, etc.)
    //alert(`Exporting ${selectedTasks.length} task(s)`);
  }

  function handleArchiveTasks() {
    if (!selectedTasks.length) return;
    
    console.log('Archiving tasks:', selectedTasks);
    // TODO: Implement task archiving logic
    // alert(`Archiving ${selectedTasks.length} task(s)`);
    // unselectAll();
  }

  function handleDeleteTasks() {
    if (!selectedTasks.length) return;
    setShowDeleteModal(true);
  }

  function confirmDeleteTasks() {
    console.log('Deleting tasks:', selectedTasks);

    // Create a deep copy of the groups array to avoid mutating the original
    const updatedGroups = board.groups.map(group => ({ ...group, tasks: [...group.tasks] }));
    
    // Iterate over each selected task and remove it from its corresponding group
    selectedTasks.forEach((selectedTask, index) => {
      console.log(`Task ${index + 1}: taskId = ${selectedTask.taskId}, groupId = ${selectedTask.groupId}`);
      
      // Find the group that contains this task
      const groupIndex = updatedGroups.findIndex(group => group.id === selectedTask.groupId);
      
      if (groupIndex !== -1) {
        // Remove the task from this group's tasks array
        updatedGroups[groupIndex].tasks = updatedGroups[groupIndex].tasks.filter(
          task => task.id !== selectedTask.taskId
        );
        console.log(`Removed task ${selectedTask.taskId} from group ${selectedTask.groupId}`);
      }
    });
    
    const update = { key: "groups", value: updatedGroups }
    updateBoard(null, null, update)

    setShowDeleteModal(false);
    unselectAll();
  }

  function cancelDeleteTasks() {
    setShowDeleteModal(false);
  }

  function handleMoveTasks() {
    if (!selectedTasks.length) return;
    
    console.log('Moving tasks:', selectedTasks);
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

  //   if (!board)
  //     return (
  //       <>
  //         <h1>Loading... </h1>{" "}
  //       </>
  //     );

  return (
    <div className="board-details">
      <div style={{ display: "flex" }}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <BoardHeader />
          <section className="group-list">
            {board &&
              board.groups.map((group) => (
                <GroupPreview
                  group={group}
                  labels={labels}
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
        onConfirm={confirmDeleteTasks}
        taskCount={selectedTasks.length}
      />
    </div>
  );
}
