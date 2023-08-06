import { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sidebar";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AppContext } from "../../context/AppContext";
import Topbar from "../../components/topbar";

const Users = () => {
    const teamsRef = collection(db, "teams");
    const [members, setMembers] = useState([]);
    const { currentTeam } = useContext(AppContext);
    
    useEffect(() => {
        const queryTeams = query(
            teamsRef,
            where("name", "==", currentTeam)
        );
        const unsubscribe = onSnapshot(queryTeams, (snapshot) => {
            let members = [];
            snapshot.forEach((doc) => {
                members.push({...doc.data(), id: doc.id});
            });
            setMembers(members);
        });

        return () => unsubscribe();
    }, [currentTeam]);

    return (
        <>
            <Sidebar/>
            <main>
                <Topbar />
                <section>
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
                </section>
            </main>
        </>
    );
}

export default Users;