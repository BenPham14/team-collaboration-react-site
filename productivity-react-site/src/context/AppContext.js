import { createContext } from "react";
import { RiHome6Line, RiChat4Line, RiDraftLine, RiFolder2Line, RiLiveLine, RiGroupLine } from "react-icons/ri";

const AppContext = createContext();

const AppContextProvider = (props) => {
    const links = [
        {label: 'Home', icon: <RiHome6Line />, path: '/'},
        {label: 'Chat', icon: <RiChat4Line/>, path: '/chat'},
        {label: 'Tasks', icon: <RiDraftLine />, path: '/tasks'},
        {label: 'Meetings', icon: <RiLiveLine />, path: '/meetings'},
        {label: 'Documents', icon: <RiFolder2Line />, path: '/documents'},
        {label: 'Users', icon: <RiGroupLine />, path: '/users'}
    ];

    const contextValue = { links };

    return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
}

export { AppContext, AppContextProvider };