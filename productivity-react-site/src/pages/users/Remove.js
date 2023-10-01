import { useState, useEffect, useRef } from "react";
import users from './Users.module.css';
import { auth, db } from '../../config/firebase';
import { deleteField, doc, updateDoc } from 'firebase/firestore';
import { RiDeleteBin4Line } from "react-icons/ri";

const Remove = ({keyName, user, teamDoc}) => {
    const [removeOpen, setRemoveOpen] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (removeOpen) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        };
    }, [removeOpen]);

    const removeUser = async () => {
        const teamRef = doc(db, "teams", teamDoc);

        await updateDoc(teamRef, {
            [`members.${keyName}`] : deleteField()
        });
    };

    return (
        <>
            <RiDeleteBin4Line 
                className={`${users.removeButton} flex`}
                style={{display: keyName == auth.currentUser.uid ? "none" : ""}}
                onClick={() => setRemoveOpen(!removeOpen)}
            />
            <dialog ref={modalRef} className={users.removeModal}>
                <div className="flex column">
                    <p>Remove "{user.name}"</p>
                    <p>Are you sure?</p>
                    <div className={users.removeModalButtons}>
                        <button onClick={removeUser}>Yes</button>
                        <button onClick={() => setRemoveOpen(false)}>No</button>
                    </div>
                </div> 
            </dialog>
        </>
    );
};

export default Remove;