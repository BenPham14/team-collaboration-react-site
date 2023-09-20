import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import { AppContext } from "../../context/AppContext";
import home from "./Home.module.css";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const Home = ({setIsAuth}) => {
    const { currentTeam, currentTeamUID, teamsList } = useContext(AppContext);
    const teamsRef = collection(db, "teams");
    const [team, setTeam] = useState([]);
    const messagesRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const queryTeams = query(
            teamsRef, 
            where("uid", "==", currentTeamUID)
        );
        const unsubscribe1 = onSnapshot(queryTeams, (snapshot) => {
            setTeam(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        });

        const queryMessages = query(
            messagesRef, 
            where("teamUID", "==", currentTeamUID), 
            orderBy("createdAt", "desc"),
            limit(1)
        );
        const unsubscribe2 = onSnapshot(queryMessages, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
        }
    }, [currentTeamUID]);

    return (
        <>
            <Sidebar />
            <main className={home.home}>
                <Topbar setIsAuth={setIsAuth}/>
                <section>
                    <p>Teams you are in:</p>
                    {
                        teamsList.map((team, index) => (
                            <p key={index}>{team.name}</p>
                        ))
                    }
                </section>
                <section>
                    <p>Members in "{currentTeam}" include:</p>
                    {
                        team.map((team) => (
                            Object.keys(team.members).map((keyName, index) => (
                                <div key={index}>
                                    <img src={team.members[keyName].image} alt={team.members[keyName].name}/>
                                    <p>{team.members[keyName].name}</p>
                                </div>
                            ))
                        ))
                    }
                </section>
                <section>
                    <p>Latest chat messages:</p>
                    {
                        messages.map((message, index) => (
                            <p key={index}>{message.user} said "{message.text}"</p>
                        ))
                    }
                </section>
                <section>
                    <p>Expiring task items:</p>
                </section>
                <section>
                    <p>Last file uploaded:</p>
                </section>
            </main>
        </>
    );
};

export default Home;