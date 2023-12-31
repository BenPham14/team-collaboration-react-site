import { RiNotification3Line, RiCloseCircleLine } from "react-icons/ri";
import topbar from "./Topbar.module.css";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot, query, updateDoc, where, deleteDoc } from 'firebase/firestore';

const Invites = () => {
    const [invites, setInvites] = useState([]);
    const [invitesOpen, setInvitesOpen] = useState(false);
    const invitesRef = collection(db, "invites");
    const [invitesCount, setInvitesCount] = useState(0);
    const modalRef = useRef(null);

    useEffect(() => {
        if (invitesOpen) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        };
    }, [invitesOpen])

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
                    setInvitesCount(invites.length);
                });
                return () => unsubscribe();
            }
        });
    }, []);

    const handleAccept = async (teamDoc, inviteDoc) => {
        const teamRef = doc(db, "teams", teamDoc);
        const inviteRef = doc(db, "invites", inviteDoc);

        // add user ID to members object
        await updateDoc(teamRef, {
            [`members.${auth.currentUser.uid}`] : {
                "name" : auth.currentUser.displayName,
                "image" : auth.currentUser.photoURL,
                "email": auth.currentUser.email,
                "role": "User"
            }
        });

        // delete invite from invites db
        await deleteDoc(inviteRef);
    };

    const handleDecline = async (inviteDoc) => {
        const inviteRef = doc(db, "invites", inviteDoc);
        await deleteDoc(inviteRef);
    };

    return (
        <>
            <div className={topbar.inviteIcon}>
                <RiNotification3Line className="flex" title='Invites' onClick={() => setInvitesOpen(true)}/>
                { invitesCount > 0 && <p className={`${topbar.count} flex`} onClick={() => setInvitesOpen(true)}>{invitesCount}</p> }
            </div>
            <dialog className={`${topbar.invites} blk-shadow`} ref={modalRef}>
                <RiCloseCircleLine onClick={() => setInvitesOpen(false)} style={{cursor: "pointer"}}/>
                {
                    invitesCount == 0 ? 
                        <p>No Invites</p> :
                        invites.map((invite) => (
                            <form key={invite.uid} className={`${topbar.inviteRow} grid`}>
                                <p>{invite.inviter} invited you to join their team - {invite.team}</p>
                                <div className={`${topbar.inviteButtons} flex`}>
                                    <button onClick={() => handleAccept(invite.teamDoc, invite.id)}>Accept</button>
                                    <button onClick={() => handleDecline(invite.id)}>Decline</button>
                                </div>
                            </form>
                        ))
                }
            </dialog>
        </>
    );
};

export default Invites;