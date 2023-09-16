import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import chat from "./Chat.module.css";
import Message from "./Message";
import { RiSendPlane2Line } from "react-icons/ri";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { AppContext } from "../../context/AppContext";

const Chat = ({setIsAuth}) => {
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages"); // get data from firebase collection
    const { currentTeam, currentTeamUID } = useContext(AppContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const queryMessages = query( // get messages where team == team
            messagesRef,
            where("teamUID", "==", currentTeamUID),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => { // listens for changes in db query
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id}); // push a all messages to local array
            });
            setMessages(messages);
        });

        return () => unsubscribe(); // cleanup useEffect to end functions that subscribe to listening services like onSnapshot
    }, [currentTeamUID]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newMessage === "") {
            return
        };
        await addDoc(messagesRef, { // reference collection that you want to add to
            text: newMessage, // data that you want to add
            createdAt: serverTimestamp(),
            team: currentTeam,
            teamUID: currentTeamUID,
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
                <Topbar setIsAuth={setIsAuth}/>
                <div className={`${chat.sections} grid`}>
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
                                placeholder="Type message"
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
};

export default Chat;