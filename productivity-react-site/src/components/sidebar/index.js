import { NavLink } from "react-router-dom";
import sidebar from "./Sidebar.module.css"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
    const {links} = useContext(AppContext);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        };

        window.addEventListener('resize', handleResize);

        handleResize();

    }, [width])

    if (width < 600) {
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
        </aside>
    );
}

export default Sidebar;