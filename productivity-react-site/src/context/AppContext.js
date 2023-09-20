import { createContext, useState, useEffect } from "react";
import { RiHome6Line, RiChat4Line, RiDraftLine, RiFolder2Line, RiLiveLine, RiGroupLine } from "react-icons/ri";

const AppContext = createContext();

const AppContextProvider = (props) => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [currentTeam, setCurrentTeam] = useState("");
    const [currentTeamUID, setCurrentTeamUID] = useState("");
    const [currentTeamDoc, setCurrentTeamDoc] = useState("");
    const [teamsList, setTeamsList] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        };

        window.addEventListener('resize', handleResize);

        handleResize();

    }, [screenWidth]);

    const links = [
        {label: 'Home', icon: <RiHome6Line />, path: '/'},
        {label: 'Chat', icon: <RiChat4Line/>, path: '/chat'},
        {label: 'Tasks', icon: <RiDraftLine />, path: '/tasks'},
        // {label: 'Meetings', icon: <RiLiveLine />, path: '/meetings'},
        {label: 'Files', icon: <RiFolder2Line />, path: '/files'},
        {label: 'Users', icon: <RiGroupLine />, path: '/users'}
    ];

    const contextValue = { links, screenWidth, currentTeam, setCurrentTeam, currentTeamUID, setCurrentTeamUID, currentTeamDoc, setCurrentTeamDoc, teamsList, setTeamsList };

    return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
};

export { AppContext, AppContextProvider };