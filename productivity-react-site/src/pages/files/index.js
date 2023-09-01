import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import files from "./files.module.css";

const Files = () => {
    const filesList = [
        {image: "", label: "File Name", createdBy: "Name", createdAt: "1/1/1"},
        {image: "", label: "File Name", createdBy: "Name", createdAt: "1/1/1"},
        {image: "", label: "File Name", createdBy: "Name", createdAt: "1/1/1"}
    ];

    return (
        <>
            <Sidebar/>
            <main className={files.files}>
                <Topbar/>
                <section className={files.list}>
                    <div className={`${files.buttons} flex`}>
                        <button>+ Upload File</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Preview</th>
                                <th>Name</th>
                                <th>Created By</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filesList.map((file, index) => (
                                    <tr key={index} className={files.item}>
                                        <td><img src={file.image} alt={file.label}/></td>
                                        <td>{file.label}</td>
                                        <td>{file.createdBy}</td>
                                        <td>{file.createdAt}</td>
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