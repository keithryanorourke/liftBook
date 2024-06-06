import { Create, Delete, FileOpen } from "@mui/icons-material"
import "./ItemActions.scss";
import { NavLink } from "react-router-dom";

const ItemActions = ({onClickEdit, href, onClickDelete, item}) => {
    
    return (
        <div className="item-actions">
            {onClickEdit && <button onClick={() => onClickEdit(item)} className="icon-button"><Create sx={{ color: "#398ce4" }} /></button>}
            {href && <NavLink to={href} className="icon-button"><FileOpen  sx={{ color: "#be1cc4" }} /></NavLink>}
            {onClickDelete && <button onClick={() => onClickDelete(item)} className="icon-button"><Delete sx={{ color: "#db820d" }} /></button>}
        </div>
    )
}

export default ItemActions;