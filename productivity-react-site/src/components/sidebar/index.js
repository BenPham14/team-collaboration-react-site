import { NavLink } from "react-router-dom";
import sidebar from "./Sidebar.module.css"
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
    const { links, screenWidth } = useContext(AppContext);

    if (screenWidth < 600) {
        return (
            <aside className={`${sidebar.mobile} flex column blk-shadow`}>
                <h3>Name</h3>
                {
                    links.map((link, index) => (
                        <NavLink key={index} to={link.path}>
                            {link.icon}
                        </NavLink>
                    ))
                }
            </aside>
        );
    }

    return (
        <aside className={`${sidebar.aside} flex column blk-shadow`}>
            <h3>Name</h3>
            {
                links.map((link, index) => (
                    <NavLink key={index} to={link.path}>
                        {link.icon}
                        {link.label}
                    </NavLink>
                ))
            }

            <h6>Benjamin Pham &copy; 2023</h6>
        </aside>
    );
}

export default Sidebar;