import Alert from "../Alert/Alert"
import Button from "../Button/Button"
import Dialog from "../Dialog/Dialog"
import "./DeleteDialog.scss"

const DeleteDialog = ({ visible, onClose, itemName, onDelete, error }) => {
  return (
    <Dialog
      title="Confirm Delete"
      visible={visible}
      onClose={onClose}
      color="danger"
    >
      <div className="delete">
        <p className="delete__text">Are you sure you want to delete {itemName}? This is permanent and cannot be undone!</p>
        <Alert message={error} />
        <div className="delete__button-container">
          <Button onClick={onClose} type="button">Cancel</Button>
          <Button theme="outlined" color="danger" onClick={onDelete} type="button">Delete</Button>
        </div>
      </div>
    </Dialog>
  )
}

export default DeleteDialog;