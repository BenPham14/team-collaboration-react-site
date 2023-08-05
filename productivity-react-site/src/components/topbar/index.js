import topbar from "./Topbar.module.css";
import { RiUser3Line } from "react-icons/ri";
import { GoChevronDown, GoChevronUp } from "react-icons/go"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Topbar = () => {
    const [teamSelect, setTeamSelect] = useState(false);
    const [currentPage, setCurrentPage] = useState("Home");
    const [profile, setProfile] = useState("");
    const { links, currentTeam, setCurrentTeam } = useContext(AppContext);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setProfile(auth.currentUser);
            }
        });
    },[]);

    useEffect(() => {
        links.filter((link) => (
            link.path === window.location.hash.slice(1) && setCurrentPage(link.label)
        ));
    }, [window.location.hash]);

    return (
        <div className={`${topbar.topbar} blk-shadow flex`}>
            <h3>{currentPage}</h3>
            <div className={`${topbar.icons} flex`}>
                <div className={`${topbar.team} flex`} onClick={() => setTeamSelect(!teamSelect)}>
                    <p>{currentTeam}</p>
                    {
                        teamSelect ? 
                            <GoChevronUp className={topbar.icon}/> :
                            <GoChevronDown className={topbar.icon}/>
                    }
                </div>
                {
                    profile ? 
                        <img src={profile.photoURL} alt=""/> :
                        <RiUser3Line className="placeholder"/>
                }
            </div>
        </div>
    );
}

export default Topbar;