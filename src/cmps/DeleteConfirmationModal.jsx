import { useEffect } from 'react';

export function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm 
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <div className="delete-modal-content">
          <h3 className="delete-modal-title">
            Delete these tasks?
          </h3>
          <p className="delete-modal-description">
            We'll keep it in your trash for 30 days, and then permanently delete it.
          </p>
        </div>
        <div className="delete-modal-actions">
          <button 
            className="delete-modal-btn cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="delete-modal-btn delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}