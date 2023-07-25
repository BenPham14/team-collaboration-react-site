import topbar from "./Topbar.module.css";
import { RiUser3Line } from "react-icons/ri";
import { GoChevronDown, GoChevronUp } from "react-icons/go"
import { useState } from "react";

const Topbar = () => {
    const [teamSelect, setTeamSelect] = useState(false);

    return (
        <div className={`${topbar.topbar} blk-shadow flex`}>
            <h3>Home</h3>
            <div className={`${topbar.icons} flex`}>
                <div className={`${topbar.team} flex`} onClick={() => setTeamSelect(!teamSelect)}>
                    <p>Team name</p>
                    {
                        teamSelect ? 
                            <GoChevronUp className={topbar.icon}/> :
                            <GoChevronDown className={topbar.icon}/>
                    }
                </div>
                
                <RiUser3Line className={topbar.user}/>
            </div>
        </div>
    );
}

export default Topbar;