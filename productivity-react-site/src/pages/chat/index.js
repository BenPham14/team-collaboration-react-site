import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import chat from "./Chat.module.css";
import Message from "./Message";
import { RiSendPlane2Line, RiUser3Line } from "react-icons/ri";

const Chat = () => {
    const messages = [
        {person: chat.owner, text: 'Hello'},
        {person: chat.other, text: 'Hello'},
        {person: chat.owner, text: 'Hello'},
        {person: chat.other, text: 'Hello'},
        {person: chat.owner, text: 'Hello'},
        {person: chat.other, text: 'Hello'}
    ];

    return (
        <>
            <Sidebar />
            <main className={chat.chat}>
                <Topbar />
                <div className={`${chat.sections} grid`}>
                    <section className={`${chat.members} flex column`}>
                        <p>Team</p>
                        <RiUser3Line/>
                        <RiUser3Line/>
                        <RiUser3Line/>
                        <RiUser3Line/>
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
                        <div className="flex">
                            <input placeholder="Message"/>
                            <RiSendPlane2Line />
                        </div>
                    </section>
                </div>
                
            </main>
        </>
    );
}

export default Chat;