import { NavLink } from "react-router-dom";
import sidebar from "./Sidebar.module.css"
import { RiHome6Line, RiChat4Line, RiDraftLine, RiFolder2Line, RiLiveLine, RiGroupLine } from "react-icons/ri";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const links = [
        {label: 'Home', icon: <RiHome6Line />, path: '/'},
        {label: 'Chat', icon: <RiChat4Line/>, path: '/chat'},
        {label: 'Tasks', icon: <RiDraftLine />, path: '/tasks'},
        {label: 'Meetings', icon: <RiLiveLine />, path: '/meetings'},
        {label: 'Documents', icon: <RiFolder2Line />, path: '/documents'},
        {label: 'Users', icon: <RiGroupLine />, path: '/users'}
    ];

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