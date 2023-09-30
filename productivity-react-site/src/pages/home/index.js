import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import { AppContext } from "../../context/AppContext";
import home from "./Home.module.css";
import { collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { RiTeamLine } from "react-icons/ri";
import More from "./More";

const Home = ({setIsAuth}) => {
    const { currentTeam, currentTeamUID, teamsList } = useContext(AppContext);
    const teamsRef = collection(db, "teams");
    const [teams, setTeams] = useState([]);
    const messagesRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);
    const tasksRef = collection(db, "tasks");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const queryTeams = query(
            teamsRef, 
            where("uid", "==", currentTeamUID)
        );
        const unsubscribe1 = onSnapshot(queryTeams, (snapshot) => {
            setTeams(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        });

        const queryMessages = query(
            messagesRef, 
            where("teamUID", "==", currentTeamUID), 
            orderBy("createdAt", "desc"),
            limit(2)
        );
        const unsubscribe2 = onSnapshot(queryMessages, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        });

        const queryTasks = query(
            tasksRef,
            where("teamUID", "==", currentTeamUID),
            orderBy("createdAt"),
            limit(2)
        );
        const unsubscribe3 = onSnapshot(queryTasks, (snapshot) => {
            setTasks(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
            unsubscribe3();
        }
    }, [currentTeamUID]);

    const deleteTask = (taskDoc) => {
        const taskRef = doc(db, "tasks", taskDoc);
        setTimeout(async () => {
            await deleteDoc(taskRef);
        }, 200);
    };

    return (
        <>
            <Sidebar />
            <main className={home.home}>
                <Topbar setIsAuth={setIsAuth}/>
                <div className={`${home.sections} grid`}>
                    <section className={`${home.teams} flex column`}>
                        <div className={home.header}>
                            <p>Your teams</p>
                        </div>
                        {
                            teamsList != [] ?
                            teamsList.map((team, index) => (
                                <div 
                                    key={index} 
                                    className={`${home.team} flex`} 
                                    style={{backgroundColor: team.name == currentTeam && "whitesmoke"}}
                                >
                                    <RiTeamLine/>
                                    <p>{team.name}</p>
                                </div>
                            )) :
                            <p>No teams to display</p>
                        }
                    </section>
                    <section className={`${home.members} flex column`}>
                        <div className={`${home.header} flex`}>
                            <p>Current team members</p>
                            <More navigateTo="/users"/>
                        </div>
                        {
                            teams != [] ?
                            teams.map((team) => (
                                Object.keys(team.members).map((keyName, index) => (
                                    <div key={index} className="flex">
                                        <img src={team.members[keyName].image} alt={team.members[keyName].name} referrerPolicy="no-referrer"/>
                                        <p>{team.members[keyName].name}</p>
                                    </div>
                                ))
                            )) :
                            <p>No members to display</p>
                        }
                    </section>
                    <section className={`${home.message} flex column`}>
                        <div className={`${home.header} flex`}>
                            <p>Latest chat messages</p>
                            <More navigateTo="/chat"/>
                        </div>
                        {
                            messages != [] ?
                            messages.map((message, index) => (
                                <div key={index} className={`${home.singleMessage} flex`}>
                                    <p>{message.user}:</p>
                                    <p className={auth.currentUser.uid === message.uid ? home.owner : home.other}>{message.text}</p>
                                </div>
                                // <p key={index}>{message.user}: <span className={auth.currentUser.uid === message.uid ? home.owner : home.other}>{message.text}</span></p>
                            )) :
                            <p>No messages to display</p>
                        }
                    </section>
                    <section className={`${home.task} flex column`}>
                        <div className={`${home.header} flex`}>
                            <p>Expiring task items</p>
                            <More navigateTo="/tasks"/>
                        </div>
                        {
                            tasks != [] ?
                            tasks.map((task, index) => (
                                <div className="flex" key={index}>
                                    <input type="checkbox" onClick={() => deleteTask(task.id)}/>
                                    <p key={index}>{task.label}</p>
                                </div>
                            )) :
                            <p>No tasks to display</p>
                        }
                    </section>
                </div>
            </main>
        </>
    );
};

export default Home;