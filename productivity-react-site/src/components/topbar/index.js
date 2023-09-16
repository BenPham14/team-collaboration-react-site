import topbar from "./Topbar.module.css";
import { RiUser3Line } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import TeamSelect from "./TeamSelect";
import Invites from "./Invites";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Topbar = ({setIsAuth}) => {
    const [teams, setTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState("Home");
    const [profile, setProfile] = useState("");
    const [createOpen, setCreateOpen] = useState(false);
    const [signOutOpen, setSignOutOpen] = useState(false);
    const { links, currentTeam, setCurrentTeam, setCurrentTeamUID, setCurrentTeamDoc } = useContext(AppContext);
    const teamsRef = collection(db, "teams");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setProfile(user);

                const queryTeams = query(
                    teamsRef,
                    orderBy('members.' + user.uid)
                );
                const unsubscribe = onSnapshot(queryTeams, (snapshot) => {
                    let teams = [];
                    snapshot.forEach((doc) => {
                        teams.push({...doc.data(), id: doc.id});
                    });
                    setTeams(teams);

                    if (currentTeam === "" && teams[0]) {
                        setCurrentTeam(teams[0].name);
                        setCurrentTeamUID(teams[0].uid);
                        setCurrentTeamDoc(teams[0].id);
                    } else if (currentTeam === "" && !teams[0]){
                        setCreateOpen(true);
                    };
                });
                return () => unsubscribe();
            }
        });
    },[]);

    useEffect(() => {
        links.filter((link) => (
            link.path === window.location.hash.slice(1) && setCurrentPage(link.label)
        ));
    }, [window.location.hash]);

    const signOutUser = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
        setIsAuth(false);
    };

    return (
        <div className={`${topbar.topbar} blk-shadow flex`}>
            <h3>{currentPage}</h3>
            <div className={`${topbar.icons} flex`}>
                <TeamSelect
                    createOpen={createOpen}
                    setCreateOpen={setCreateOpen}
                    teams={teams}
                    teamsRef={teamsRef}
                />
                <Invites/>
                <div className={`${topbar.profileIcon} flex`}>
                    {
                        profile ? 
                            <img title='Profile' src={profile.photoURL} alt="" onClick={() => setSignOutOpen(!signOutOpen)}/> :
                            <RiUser3Line title='Profile' className="placeholder" onClick={() => setSignOutOpen(!signOutOpen)}/>
                    }
                    <div className={topbar.signOut} style={{display: signOutOpen ? "" : "none"}}>
                        <button onClick={signOutUser}>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;