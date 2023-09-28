import { RiMore2Fill } from "react-icons/ri";
import home from "./Home.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const More = ({navigateTo}) => {
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={`${home.more} flex`}>
            <RiMore2Fill onClick={() => setShowMore(!showMore)}/>
            <div style={{display: !showMore && "none"}}>
                <button onClick={() => navigate(navigateTo)}>Go to page</button>
            </div>
        </div>
    );
};

export default More;