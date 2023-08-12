import { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sidebar";
import { collection, onSnapshot, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { AppContext } from "../../context/AppContext";
import Topbar from "../../components/topbar";
import {v4 as uuidv4} from 'uuid';
import users from './Users.module.css';

const Users = () => {
    const teamsRef = collection(db, "teams");
    const invitesRef = collection(db, "invites");
    const [teams, setTeams] = useState([]);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const { currentTeam, currentTeamUID, currentTeamDoc } = useContext(AppContext);
    
    useEffect(() => {
        const queryTeams = query(
            teamsRef,
            where("uid", "==", currentTeamUID)
        );
        const unsubscribe = onSnapshot(queryTeams, (snapshot) => {
            let teams = [];
            snapshot.forEach((doc) => {
                teams.push({...doc.data(), id: doc.id});
            });
            setTeams(teams);
        });
        return () => unsubscribe();
    }, [currentTeamUID]);

    const handleSend = async (event) => {
        event.preventDefault();
        if (newName === "") {
            return
        };
        await addDoc(invitesRef, {
            createdAt: serverTimestamp(),
            uid: uuidv4(),
            invitee: newName,
            inviter: auth.currentUser.displayName,
            team: currentTeam,
            teamUID: currentTeamUID,
            teamDoc: currentTeamDoc
        });
        setNewName("");
        setInviteOpen(false);
    };

    return (
        <>
            <Sidebar/>
            <main className={users.users}>
                <Topbar />
                <section>
                    <div className={`${users.list} grid`}>
                        <div className={`${users.header} flex`}>
                            <h3>{currentTeam}</h3>
                            <button className="blk-shadow" onClick={() => setInviteOpen(true)}>+ Invite Users</button>
                        </div>
                        {
                            teams.map((team) => (
                                Object.keys(team.members).map((keyName, id) => (
                                    <div key={id} className={`${users.user} flex`}>
                                        <img src={team.members[keyName].image} alt={team.members[keyName].name}/>
                                        <p>{team.members[keyName].name}</p>
                                    </div>
                                ))
                            ))
                        }
                    </div>
                    <dialog open={inviteOpen}>
                        <form onSubmit={handleSend}>
                            <input type="email" value={newName} placeholder="Enter Email" onChange={(event) => setNewName(event.target.value)} required/>
                            <button type="submit">Create</button>
                            <button type="button" onClick={() => {setInviteOpen(!inviteOpen); setNewName("")}}>Cancel</button>
                        </form>
                    </dialog>
                </section>
            </main>
        </>
    );
}

export default Users;