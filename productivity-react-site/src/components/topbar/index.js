import topbar from "./Topbar.module.css";
import { RiTeamLine, RiUser3Line } from "react-icons/ri";
import { GoChevronDown, GoChevronUp } from "react-icons/go"
import { useState } from "react";

const Topbar = () => {
    const [teamSelect, setTeamSelect] = useState(false);

    return (
        <div className={`${topbar.topbar} blk-shadow flex`}>
            <h3>Home</h3>
            <div className={`${topbar.icons} flex`}>
                <div className="flex" onClick={() => setTeamSelect(!teamSelect)}>
                    <p>Team</p>
                    {
                        teamSelect ? 
                            <GoChevronUp /> :
                            <GoChevronDown />
                    }
                </div>
                
                <RiUser3Line className={topbar.user}/>
            </div>
        </div>
    );
}

export default Topbar;