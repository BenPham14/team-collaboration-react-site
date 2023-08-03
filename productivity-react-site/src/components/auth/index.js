import authCSS from './Auth.module.css';
import { auth, provider } from '../../config/firebase.js';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Auth = ({setIsAuth}) => {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={`${authCSS.login} flex`}>
            <div className="flex column blk-shadow">
                <p>Sign In With Google To Continue</p>
                <button onClick={signInWithGoogle}>Sign In With Google</button>
            </div>
        </div>
    );
}

export { Auth };