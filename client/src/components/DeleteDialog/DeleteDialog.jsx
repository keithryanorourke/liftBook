import Dialog from "../Dialog/Dialog"
import "./DeleteModal.scss"

const DeleteDialog = ({ visible, onClose, itemName, onDelete }) => {
  return (
    <Dialog
      title="Confirm Delete"
      visible={visible}
      onClose={onClose}
      color="danger"
    >
      <p>Are you sure you want to delete {itemName}? This is permanent and cannot be undone!</p>
      <div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </Dialog>
  )
}

export default DeleteDialog