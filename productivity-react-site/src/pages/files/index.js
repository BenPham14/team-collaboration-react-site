import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import files from "./files.module.css";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { AppContext } from "../../context/AppContext";
import {v4 as uuidv4} from 'uuid';

const Files = ({setIsAuth}) => {
    const [uploadOpen, setUploadOpen] = useState(false);
    const [fileUpload, setFileUpload] = useState(null);
    const { currentTeamUID } = useContext(AppContext);
    const fileListRef = ref(storage, `${currentTeamUID}/`);
    const [fileList, setFileList] = useState([]);
    const modalRef = useRef(null);

    useEffect(() => {
        if(uploadOpen) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        };
    }, [uploadOpen])

    useEffect(() => {
        setFileList([]);

        listAll(fileListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setFileList((prev) => [...prev, {downloadURL: url, name: item.name}]);
                });
            });
        });
    }, [currentTeamUID]);

    const uploadFile = () => {
        if (fileUpload == null) {
            return;
        };

        const fileRef = ref(storage, `${currentTeamUID}/${fileUpload.name}`); // fileUpload.name + uuidv4()
        uploadBytes(fileRef, fileUpload)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        setFileList(fileList.filter((file) => file.name != snapshot.ref.name)); // when I upload a new file, this will get rid of the existing file with same name in state
                        setFileList((prev) => [...prev, {downloadURL: url, name: snapshot.ref.name}]); // then this put the new file into the array in state
                    });
            });

        setUploadOpen(false);
    };

    return (
        <>
            <Sidebar/>
            <main className={files.files}>
                <Topbar setIsAuth={setIsAuth}/>
                <section className={files.list}>
                    <div className={`${files.uploadButton} flex`}>
                        <button onClick={() => setUploadOpen(true)}>+ Upload File</button>
                    </div>
                    <dialog ref={modalRef}>
                        <input type="file" onChange={(event) => setFileUpload(event.target.files[0])}/>
                        <div className={`${files.fileButtons} flex`}>
                            <button onClick={uploadFile}>Upload</button>
                            <button onClick={() => setUploadOpen(false)}>Cancel</button>
                        </div>
                    </dialog>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Link</th>
                                {/* <th>Size</th>
                                <th>Last Modified</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fileList.map((file, index) => (
                                    <tr key={index} className={files.item}>
                                        <td>{file.name}</td>
                                        <td><a href={file.downloadURL} target="_blank">View file</a></td>
                                        {/* <td>{file.size}</td>
                                        <td>{file.lastModified}</td> */}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    
                </section>
            </main>
        </>
    );
};

export default Files;