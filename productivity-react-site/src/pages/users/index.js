import { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sidebar";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AppContext } from "../../context/AppContext";
import Topbar from "../../components/topbar";

const Users = () => {
    const teamsRef = collection(db, "teams");
    const [teams, setTeams] = useState([]);
    const { currentTeam, currentTeamUID } = useContext(AppContext);
    
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

    return (
        <>
            <Sidebar/>
            <main>
                <Topbar />
                <section>
                    <p>{currentTeam}</p>
                    {
                        teams.map((team) => (
                            Object.keys(team.members).map((keyName, id) => (
                                <div key={id}>
                                    <img src={team.members[keyName].image} alt={team.members[keyName].name}/>
                                    <p>{team.members[keyName].name}</p>
                                </div>
                            ))
                        ))
                    }
                    <button>+ Invite Users</button>
                </section>
            </main>
        </>
    );
}

export default Users;