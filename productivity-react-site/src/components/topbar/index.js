import topbar from "./Topbar.module.css";
import { RiUser3Line } from "react-icons/ri";
import { GoChevronDown, GoChevronUp } from "react-icons/go"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Topbar = () => {
    const [teamSelect, setTeamSelect] = useState(false);
    const [teams, setTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState("Home");
    const [profile, setProfile] = useState("");
    const { links, currentTeam, setCurrentTeam } = useContext(AppContext);
    const teamsRef = collection(db, "teams");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setProfile(auth.currentUser);
            }
        });

        const queryTeams = query(
            teamsRef,
            where("members", "array-contains", "NfrIMKljjWSGE7480qVDq4eG3lt1")
        );
        const unsubscribe = onSnapshot(queryTeams, (snapshot) => {
            let teams = [];
            snapshot.forEach((doc) => {
                teams.push({...doc.data(), id: doc.id});
            });
            setTeams(teams);
        });

        return () => unsubscribe();
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
                <div className={`${topbar.team} flex ${teamSelect && topbar.active}`} onClick={() => setTeamSelect(!teamSelect)}>
                    <p>{currentTeam}</p>
                    {
                        teamSelect ? 
                            <GoChevronUp className={topbar.icon}/> :
                            <GoChevronDown className={topbar.icon}/>
                    }
                    {
                        teamSelect &&
                        <div className={`${topbar.dropDown} flex column`}>
                            <p>+ Create Team</p>
                            {/* <button onClick={() => setCurrentTeam(teams[0].name)}>{teams[0].name}</button> */}
                        </div>
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