import topbar from "./Topbar.module.css";
import { RiUser3Line } from "react-icons/ri";
import { GoChevronDown, GoChevronUp } from "react-icons/go"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';

const Topbar = () => {
    const [teamSelect, setTeamSelect] = useState(false);
    const [teams, setTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState("Home");
    const [profile, setProfile] = useState("");
    const [createOpen, setCreateOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const { links, currentTeam, setCurrentTeam } = useContext(AppContext);
    const teamsRef = collection(db, "teams");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setProfile(user);

                const queryTeams = query(
                    teamsRef,
                    where("members", "array-contains", user.uid)
                );
                const unsubscribe = onSnapshot(queryTeams, (snapshot) => {
                    let teams = [];
                    snapshot.forEach((doc) => {
                        teams.push({...doc.data(), id: doc.id});
                    });
                    setTeams(teams);
                    setCurrentTeam(teams[0] ? teams[0].name : "");
                });
                return () => unsubscribe();
            }
        });
    },[]);

    useEffect(() => {
        links.filter((link) => (
            link.path === window.location.hash.slice(1) && setCurrentPage(link.label)
        ));
    }, [window.location.hash]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newName === "") {
            return
        };
        await addDoc(teamsRef, {
            name: newName,
            createdAt: serverTimestamp(),
            members: [auth.currentUser.uid],
            memberDetails: [{
                uid: auth.currentUser.uid,
                name: auth.currentUser.displayName, 
                image: auth.currentUser.photoURL
            }]
        });
        setNewName("");
        setCreateOpen(!createOpen);
    };

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
                            <button onClick={() => setCreateOpen(!createOpen)}>+ Create Team</button>
                            {
                                teams.map((team) => (
                                    <button key={team.id} onClick={() => setCurrentTeam(team.name)}>{team.name}</button>
                                ))
                            }
                            
                        </div>
                    }
                </div>
                <dialog className={topbar.create} open={createOpen}>
                    <form className="flex column" onSubmit={handleSubmit}>
                        <input type="text" value={newName} onChange={(event) => setNewName(event.target.value)}/>
                        <div className="flex">
                            <button type="submit">Create</button>
                            <button type="button" onClick={() => setCreateOpen(!createOpen)}>Cancel</button>
                        </div>
                    </form>
                </dialog>
                
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