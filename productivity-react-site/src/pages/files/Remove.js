import { RiDeleteBin4Line } from "react-icons/ri";
import files from './files.module.css';
import { useContext, useEffect, useRef, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";

const Remove = ({file, fileList, setFileList}) => {
    const { currentTeamUID } = useContext(AppContext);
    const [removeOpen, setRemoveOpen] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (removeOpen) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        };
    }, [removeOpen]);

    const removeFile = () => {
        const fileRef = ref(storage, `${currentTeamUID}/${file.name}`);
        deleteObject(fileRef)
            .then(() => {
                setFileList(fileList.filter((f) => f.name !== file.name));
            });
        setRemoveOpen(false);
    };

    return (
        <>
            <RiDeleteBin4Line
                className={`${files.removeButton} flex`}
                onClick={() => setRemoveOpen(true)}
            />
            <dialog ref={modalRef} className={files.removeModal}>
                <div className="flex column">
                    <p>Remove "{file.name}"</p>
                    <p>Are you sure?</p>
                    <div className={files.removeModalButtons}>
                        <button onClick={removeFile}>Yes</button>
                        <button onClick={() => setRemoveOpen(false)}>No</button>
                    </div>
                </div> 
            </dialog>
        </>
    );
};

export default Remove;