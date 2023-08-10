import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Nav";
import EditComponent from "../components/EditComponent";

const EditPage = () => {

    const params = useParams()
    const [post, setPost] = useState([])
    const [refresh, setRefresh] = useState(true);

    useEffect (() => {
        const getPostItems = async () => {
            const response = await axios.get(`/api/updatePost/${params.id}`)
            setPost(response.data)
        }
        getPostItems()
    }, [refresh])

    return ( 
        <>
            <header>
                <NavBar/>
            </header>
            <main>
                <EditComponent
                    id={post._id}
                    title={post.title}
                    author={post.author}
                    description={post.description}
                    imageUrl={post.image?.url}
                    setRefresh={setRefresh}
                />
            </main>
        </>
     );
}
 
export default EditPage;