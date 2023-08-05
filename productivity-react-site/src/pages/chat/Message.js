import { RiUser3Line } from "react-icons/ri";
import chat from "./Chat.module.css";
import { auth } from "../../config/firebase";

const Message = ({message}) => {
    return (
        <div className={`${auth.currentUser.uid === message.uid ? chat.owner : chat.other} flex`}>
            {/* <RiUser3Line/> */}
            <img src={message.image} alt={message.user}/>
            <p>{message.text}</p>
        </div>
    );
}

export default Message;