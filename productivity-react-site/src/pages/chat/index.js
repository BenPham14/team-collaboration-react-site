import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import chat from "./Chat.module.css";
import Message from "./Message";
import { RiSendPlane2Line } from "react-icons/ri";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { AppContext } from "../../context/AppContext";

const Chat = () => {
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages"); // get data from firebase collection
    const teamsRef = collection(db, "teams");
    const { currentTeam } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const getMessages = () => {
            const queryMessages = query( // get messages where team == team
                messagesRef, 
                where("team", "==", currentTeam),
                orderBy("createdAt")
            );
            onSnapshot(queryMessages, (snapshot) => { // listens for changes in db query
                let messages = [];
                snapshot.forEach((doc) => {
                    messages.push({...doc.data(), id: doc.id}); // push a all messages to local array
                });
                setMessages(messages);
            });
        };

        const getMembers = () => {
            const queryTeams = query(
                teamsRef,
                where("name", "==", currentTeam)
            );
            onSnapshot(queryTeams, (snapshot) => {
                let members = [];
                snapshot.forEach((doc) => {
                    members.push({...doc.data(), id: doc.id});
                });
                setMembers(members);
            });
        }
        
        getMessages();
        getMembers();
        // return () => unsubscribe(); // cleanup useEffect to end functions that subscribe to listening services like onSnapshot
    }, [currentTeam]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newMessage === "") {
            return
        };
        await addDoc(messagesRef, { // reference collection that you want to add to
            text: newMessage, // data that you want to add
            createdAt: serverTimestamp(),
            team: currentTeam,
            uid: auth.currentUser.uid,
            user: auth.currentUser.displayName,
            image: auth.currentUser.photoURL
        });
        setNewMessage("");
    };

    return (
        <>
            <Sidebar />
            <main className={chat.chat}>
                <Topbar />
                <div className={`${chat.sections} grid`}>
                    <section className={`${chat.members} flex`}>
                        <p>Team</p>
                        {
                            members.map((member) => (
                                member.memberDetails.map((details) =>
                                    <img key={details.uid} src={details.image} alt={details.name}/>
                                )
                            ))
                        }
                    </section>
                    <section className={`${chat.messages} flex column`}>
                        {
                            messages.map((message) => (
                                <Message
                                    key={message.id}
                                    message={message}
                                />
                            ))
                        }
                    </section>
                    <section className={chat.bar}>
                        <form className="flex" onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Message"
                                value={newMessage}
                                onChange={(event) => setNewMessage(event.target.value)}
                            />
                            <button type="submit" className="flex"><RiSendPlane2Line/></button>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Chat;