import { useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import chat from "./Chat.module.css";
import Message from "./Message";
import { RiSendPlane2Line, RiUser3Line } from "react-icons/ri";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

const Chat = () => {
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");

    const users = [
        {name: "hello", image: null},
        {name: "hello", image: null},
        {name: "hello", image: null},
        {name: "hello", image: null}
    ]

    const messages = [
        {person: chat.owner, text: 'Hello'},
        {person: chat.other, text: 'Hello'},
        {person: chat.owner, text: 'Hello'},
        {person: chat.other, text: 'Hello'},
        {person: chat.owner, text: 'Hello'},
        {person: chat.other, text: 'Hello'},
        {person: chat.owner, text: 'Hello'},
        {person: chat.other, text: 'Hello'}
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newMessage === "") {
            return
        };
        await addDoc(messagesRef, { // reference collection that you want to add to
            text: newMessage, // data that you want to add
            createdAt: serverTimestamp(),
            // team: "",
            user: auth.currentUser.displayName
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
                            users.map((user, index) => {
                                if (user.image) {
                                    return <img key={index} src={user.image} alt={user.name}/>
                                }
                                return <RiUser3Line key={index} className="placeholder"/>
                            })
                        }
                    </section>
                    <section className={`${chat.messages} flex column`}>
                        {
                            messages.map((message, index) => (
                                <Message
                                    key={index}
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