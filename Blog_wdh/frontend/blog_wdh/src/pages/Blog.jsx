import NavBar from "../components/Nav";
import axios from "axios"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogPostItem from "../components/BlogPostItem";


const Blog = () => {

    const params = useParams()
    const [post, setPost] = useState([])
    const [refresh, setRefresh] = useState(true)

    // # Daten aus dem Backend fetchen
    useEffect(() => {
        const getPosts = async () => {
            const response = await axios.get("/api/posts")
            setPost(response.data)
        }
        getPosts()
    }, [refresh])

    // # Post löschen
    const deletePost = async (postId) => {
        try {
            const {data} = await axios.delete(`/api/post/delete/${postId}`)
            setRefresh(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <>
            <header>
                <NavBar/>
            </header>
            <main>
                {post?.map((singlePost) => 
                <BlogPostItem key={singlePost._id}
                id={singlePost._id}
                title={singlePost.title}
                author={singlePost.author}
                description={singlePost.description}
                imageUrl={singlePost.image.url}
                onDelete={() => deletePost(singlePost._id)}
                />)}
            </main>
        </>
     );
}
 
export default Blog;