import axios from "axios"
import { useEffect, useState } from "react"
import CreatePostForm from "../components/CreatePostForm"
import CreatePostImageForm from "../components/CreatePostImageForm";


const Home = () => {
    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/posts")
            setPosts(data)
        }
        fetchData()
    }, [refresh])

    const handleDelete = async (postId) => {
        try {
            const { data } = await axios.delete(`/api/deletePost/${postId}`)
            console.log(data)
            setRefresh(prev => !prev)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <main>
            {/* <CreatePostForm setRefresh={setRefresh} /> */}
            <CreatePostImageForm setRefresh={setRefresh}/>
            {posts.map(post => (
                <div className="postWrapper" key={post._id}>
                    <img src={post.image?.url} alt={post.title} />
                    <h4>{post.title}</h4>
                    <p>{post.content}</p>
                    <button onClick={() => handleDelete(post._id)} >Delete</button>
                </div>
            ))}
        </main>
    )
}
export default Home