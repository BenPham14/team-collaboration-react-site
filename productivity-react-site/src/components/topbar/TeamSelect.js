import { GoChevronDown, GoChevronUp } from "react-icons/go"
import { useState, useContext, useEffect, useRef } from "react";
import topbar from "./Topbar.module.css";
import { AppContext } from "../../context/AppContext";
import { auth } from "../../config/firebase";
import { addDoc, serverTimestamp } from 'firebase/firestore';
import {v4 as uuidv4} from 'uuid';

const TeamSelect = ({createOpen, setCreateOpen, teams, teamsRef }) => {
    const [teamSelect, setTeamSelect] = useState(false);
    const [newName, setNewName] = useState("");
    const { currentTeam, setCurrentTeam, setCurrentTeamUID, setCurrentTeamDoc } = useContext(AppContext);
    const modalRef = useRef(null);

    useEffect(() => {
        if (createOpen) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        };
    }, [createOpen]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newName === "") {
            return
        };
        await addDoc(teamsRef, {
            uid: uuidv4(),
            name: newName,
            createdAt: serverTimestamp(),
            members: {
                [auth.currentUser.uid]: {
                    name: auth.currentUser.displayName, 
                    image: auth.currentUser.photoURL,
                    email: auth.currentUser.email,
                    role: "Owner"
                }
            }
        });
        setNewName("");
        setCreateOpen(false);
    };

    const handleSelect = (name, id, doc) => {
        setCurrentTeam(name);
        setCurrentTeamUID(id);
        setCurrentTeamDoc(doc);
    };

    return (
        <>
            <div className={`${topbar.team} flex ${teamSelect && topbar.active}`} onClick={() => setTeamSelect(!teamSelect)}>
                <p title={currentTeam}>{currentTeam}</p>
                {
                    teamSelect ? 
                        <GoChevronUp className={topbar.icon}/> :
                        <GoChevronDown className={topbar.icon}/>
                }
                {
                    teamSelect &&
                    <div className={`${topbar.dropDown} flex column`}>
                        <button className="blk-shadow" onClick={() => setCreateOpen(true)}>+ Create Team</button>
                        {
                            teams.map((team) => (
                                <button className="blk-shadow" key={team.id} onClick={() => handleSelect(team.name, team.uid, team.id)}>{team.name}</button>
                            ))
                        }
                        
                    </div>
                }
            </div>
            <dialog className={`${topbar.create} blk-shadow`} ref={modalRef}>
                <form className="flex column" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter Team Name" value={newName} onChange={(event) => setNewName(event.target.value)} required/>
                    <div className="flex">
                        <button type="submit">Create</button>
                        <button type="button" onClick={() => {setCreateOpen(!createOpen); setNewName("")}}>Cancel</button>
                    </div>
                </form>
            </dialog>
        </>
    );
};

export default TeamSelect;