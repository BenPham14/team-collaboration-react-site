import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import files from "./files.module.css";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { AppContext } from "../../context/AppContext";
import {v4 as uuidv4} from 'uuid';

const Files = () => {
    const [uploadOpen, setUploadOpen] = useState(false);
    const [fileUpload, setFileUpload] = useState(null);
    const { currentTeamUID } = useContext(AppContext);
    const fileListRef = ref(storage, `${currentTeamUID}/`);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        setFileList([]);

        listAll(fileListRef)
            .then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item)
                        .then((url) => {
                            setFileList((prev) => [...prev, {downloadURL: url, name: item.name}]);
                        });
                        // console.log(response.items[0]);
                });
            });
    }, [currentTeamUID]);

    const uploadFile = () => {
        if (fileUpload == null) {
            return;
        };

        const fileRef = ref(storage, `${currentTeamUID}/${fileUpload.name + uuidv4()}`);
        uploadBytes(fileRef, fileUpload)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        setFileList((prev) => [...prev, {downloadURL: url, name: snapshot.ref.name}]);
                    });
            });
    };

    return (
        <>
            <Sidebar/>
            <main className={files.files}>
                <Topbar/>
                <section className={files.list}>
                    <div className={`${files.buttons} flex`}>
                        <button onClick={() => setUploadOpen(true)}>+ Upload File</button>
                    </div>
                    <dialog open={uploadOpen}>
                        <input type="file" onChange={(event) => setFileUpload(event.target.files[0])}/>
                        <button onClick={uploadFile}>Upload</button>
                        <button onClick={() => setUploadOpen(false)}>Cancel</button>
                    </dialog>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                {/* <th>Size</th>
                                <th>Last Modified</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fileList.map((file, index) => (
                                    <tr key={index} className={files.item}>
                                        <td><a href={file.downloadURL}>{file.name}</a></td>
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