import { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sidebar";
import { collection, onSnapshot, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { AppContext } from "../../context/AppContext";
import Topbar from "../../components/topbar";
import { AiOutlinePlusCircle } from "react-icons/ai";
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
                            {/* <h3>{currentTeam}</h3>
                            <button className="blk-shadow" onClick={() => setInviteOpen(true)}>+ Invite User</button> */}
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teams.map((team) => (
                                        Object.keys(team.members).map((keyName, id) => (
                                            <tr key={id} className={users.user}>
                                                <td className="flex">
                                                    <img src={team.members[keyName].image} alt={team.members[keyName].name}/>
                                                </td>
                                                <td>{team.members[keyName].name}</td>
                                                <td>{team.members[keyName].email}</td>
                                                <td>{team.members[keyName].role}</td>
                                            </tr>
                                        ))
                                    ))
                                }
                                <tr className={`${users.user} ${users.add}`} onClick={() => setInviteOpen(true)}>
                                    <td><AiOutlinePlusCircle/></td>
                                    <td>Invite User</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <dialog open={inviteOpen} className={users.invite}>
                        <form onSubmit={handleSend} className="flex column">
                            <input type="email" value={newName} placeholder="Enter Email" onChange={(event) => setNewName(event.target.value)} required/>
                            <div className={`${users.inviteButtons} flex`}>
                                <button type="submit">Create</button>
                                <button type="button" onClick={() => {setInviteOpen(!inviteOpen); setNewName("")}}>Cancel</button>
                            </div>
                        </form>
                    </dialog>
                </section>
            </main>
        </>
    );
};

export default Users;