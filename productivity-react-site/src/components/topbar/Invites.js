import { RiNotification3Line } from "react-icons/ri";
import topbar from "./Topbar.module.css";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';

const Invites = () => {
    const [invites, setInvites] = useState([]);
    const invitesRef = collection(db, "invites");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const queryInvites = query(
                    invitesRef,
                    where("invitee", "==", user.email)
                );
                const unsubscribe = onSnapshot(queryInvites, (snapshot) => {
                    let invites = [];
                    snapshot.forEach((doc) => {
                        invites.push({...doc.data(), id: doc.id});
                    });
                    setInvites(invites);
                });
                return () => unsubscribe();
            }
        });
    }, []);

    return (
        <>
            <RiNotification3Line/>
            <dialog className="blk-shadow" open>
                {
                    invites.map((invite) => (
                        <form>
                            <p>{invite.inviter} invited you to join their team - {invite.team}</p>
                            <button>Accept</button>
                            <button>Decline</button>
                        </form>
                    ))
                }
            </dialog>
        </>
    );
}

export default Invites;