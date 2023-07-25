import { NavLink } from "react-router-dom";
import sidebar from "./Sidebar.module.css"
import { RiHome6Line, RiChat4Line, RiDraftLine, RiFolder2Line, RiLiveLine, RiChat2Fill, RiGroupLine } from "react-icons/ri";

const Sidebar = () => {
    return (
        <aside className={`${sidebar.aside} flex column blk-shadow`}>
            <h3>Name</h3>
            <NavLink to='/'>
                <RiHome6Line />
                Home
            </NavLink>
            <NavLink to='/chat'>
                <RiChat4Line/>
                Chat
            </NavLink>
            <NavLink to='/tasks'>
                <RiDraftLine />
                Tasks
            </NavLink>
            <NavLink to='/meetings'>
                <RiLiveLine />
                Meetings
            </NavLink>
            <NavLink to='/documents'>
                <RiFolder2Line />
                Documents
            </NavLink>
            <NavLink to='/users'>
                <RiGroupLine />
                Users
            </NavLink>
        </aside>
    );
}

export default Sidebar;