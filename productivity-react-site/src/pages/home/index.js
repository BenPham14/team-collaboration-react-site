import { useContext, useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import { AppContext } from "../../context/AppContext";
import home from "./Home.module.css";

const Home = ({setIsAuth}) => {
    const [teamsList, setTeamsList] = useState([]);
    const { currentTeam, currentTeamUID } = useContext(AppContext);

    return (
        <>
            <Sidebar />
            <main className={home.home}>
                <Topbar 
                    setIsAuth={setIsAuth}
                    setTeamsList={setTeamsList}
                />
                <section>
                    <p>Teams you are in:</p>
                    {
                        teamsList.map((team, index) => (
                            <p key={index}>{team.name}</p>
                        ))
                    }
                </section>
                <section>
                    <p>Members in the "{currentTeam}" team include:</p>
                    <div>
                        <img src="" alt="Image"></img>
                        <p>Name</p>
                    </div>
                    <div>
                        <img src="" alt="Image"></img>
                        <p>Name</p>
                    </div>
                </section>
                <section>
                    <p>Latest chat messages:</p>
                </section>
                <section>
                    <p>Expiring task items:</p>
                </section>
                <section>
                    <p>Last file uploaded:</p>
                </section>
            </main>
        </>
    );
};

export default Home;