import { RiUser3Line } from "react-icons/ri";
import chat from "./Chat.module.css";

const Message = ({message}) => {
    return (
        <div className={`${message.person} flex`}>
            {/* <RiUser3Line/> */}
            <p>{message.text}</p>
        </div>
    );
}

export default Message;