import React, { useEffect, useState, useRef } from "react";

export const AppModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    style: {},
    content: null,
  });

  const dialogRef = useRef(null);

  useEffect(() => {
    const showHandler = (event) => {
      console.log(event.detail);
      const { data, pos } = event.detail;

      console.log("POS:", pos);

      const boxStyles = {
        position: "fixed",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
        left: `${pos.left + window.scrollX}px`, // Ensure correct left position
        top: `${pos.top + window.scrollY}px`, // Ensure correct top position
        width: `${pos.width}px`,
        height: `${pos.height}px`,
      };

      setModalContent({ style: boxStyles, content: data });
      setIsVisible(true);
    };

    const hideHandler = () => {
      setIsVisible(false);
      setModalContent({ style: {}, content: null });
    };

    window.addEventListener("showModal", showHandler);
    window.addEventListener("hideModal", hideHandler);

    return () => {
      window.removeEventListener("showModal", showHandler);
      window.removeEventListener("hideModal", hideHandler);
    };
  }, []);

  useEffect(() => {
    if (!modalContent.content) return;
    loadTaskForDisplay();
  }, [modalContent]);

  function loadTaskForDisplay() {
    console.log(modalContent);
  }

  useEffect(() => {
    if (!dialogRef.current) return;
    if (isVisible) {
      dialogRef.current.show();
    } else {
      dialogRef.current.close();
    }
  }, [isVisible]);

  function closeModal(ev) {
    console.log(ev.target.classList);
  }

  if (!isVisible) return null;

  return (
    <dialog ref={dialogRef} className="modal modal-overlay">
      <div className="modal-content">
        {modalContent.content && (
            'modalContent'
        //   <TrelloTaskPreview
        //     // style={modalContent.style}
        //     task={modalContent.content}
        //     style={modalContent.style}
        //     display="modal"
        //     updateTask={() => console.log("Update task")}
        //     closeModal={() => window.dispatchEvent(new Event("hideModal"))}
        //   />
        )}
      </div>
    </dialog>
  );
};
