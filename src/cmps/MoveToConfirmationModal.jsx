import { useEffect } from 'react';

export function MoveToConfirmationModal({ 
  groups,
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
            Move tasks to:
             
          </h3>
          <div>
            {groups.map((group) => (
              <li className='moveToButton' key={group.id} onClick={() => onConfirm(group.id)}>
                <button style={styles.moveToButton}>
                    <span
                      className="color-indicator" 
                      style={{
                        ...styles.colorIndicator,
                        backgroundColor: group.style.color
                      }}
                    />&nbsp;
                    {group.title}
                  </button>
              </li>
            ))}
            {/* <ul className="secondary context-menu">
              {groups.map(group => (
                <li key={group.id}>
                  <button>
                    <span 
                      className="color-indicator" 
                      style={{ backgroundColor: group.style.color }} 
                    />
                    {group.title}
                  </button>
                </li>
              ))}
            </ul> */}
          </div>
          <p className="delete-modal-description">
           
          </p>
        </div>
        <div className="moveToModalAction">
          <button 
            className="delete-modal-btn cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          {/* <button 
            className="delete-modal-btn delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button> */}
        </div>
      </div>
    </div>
  );
}
const styles = {
  moveToButton:{    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '0',
    marginInlineEnd: '20px',
    pointerEvents: 'auto',
    backgroundColor: '#fff',
    transition: '50ms ease-in',
    width:'100%'
  },
  colorIndicator:{
        display: 'block',
    height: '14px',
    width: '14px',
    borderRadius: '100%'
  },
  moveToModalAction: {
    display:'flex',gap:'12'
  }
}