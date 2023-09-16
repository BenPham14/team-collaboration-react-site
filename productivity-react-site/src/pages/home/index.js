import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";

const Home = ({setIsAuth}) => {
    return (
        <>
            <Sidebar />
            <main>
                <Topbar setIsAuth={setIsAuth}/>
            </main>
        </>
    );
};

export default Home;