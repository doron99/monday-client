import {
  PencilIcon,
  DocumentDuplicateIcon,
  ArrowTopRightOnSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";


export function GroupMenu({ 
  group,
  onRenameGroup,
  onDuplicateGroup,
  onMoveGroup,
  onDeleteGroup,
  ref
}) {
  
    return (
    <div className="group-menu" ref={ref}>
      <div className="menu-item" onClick={onRenameGroup}>
        <PencilIcon className="menu-icon" />
        <span>Rename group</span>
      </div>
      <div className="menu-item" onClick={onDuplicateGroup}>
        <DocumentDuplicateIcon className="menu-icon" />
        <span>Duplicate this group</span>
      </div>
      <div className="menu-item" onClick={onMoveGroup}>
        <ArrowTopRightOnSquareIcon className="menu-icon" />
        <span>Move group</span>
      </div>
      <div className="menu-separator"></div>
      <div className="menu-item delete" onClick={() => onDeleteGroup(group.id)}>
        <TrashIcon className="menu-icon" />
        <span>Delete group</span>
      </div>
    </div>
  );
}
