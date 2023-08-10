import { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sidebar";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AppContext } from "../../context/AppContext";
import Topbar from "../../components/topbar";

const Users = () => {
    const teamsRef = collection(db, "teams");
    const [members, setMembers] = useState([]);
    const { currentTeam, currentTeamUID } = useContext(AppContext);
    
    useEffect(() => {
        const queryTeams = query(
            teamsRef,
            where("uid", "==", currentTeamUID)
        );
        const unsubscribe = onSnapshot(queryTeams, (snapshot) => {
            let members = [];
            snapshot.forEach((doc) => {
                members.push({...doc.data(), id: doc.id});
            });
            setMembers(members);
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
                        members.map((member) => (
                            member.memberDetails.map((details) => 
                                <div key={details.uid}>
                                    <img src={details.image} alt={details.name}/>
                                    <p>{details.name}</p>
                                </div>
                            )
                        ))
                    }
                    <button>+ Add Member</button>
                </section>
            </main>
        </>
    );
}

export default Users;