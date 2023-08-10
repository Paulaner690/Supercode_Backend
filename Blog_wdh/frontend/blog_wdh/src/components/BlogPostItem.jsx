import { NavLink } from "react-router-dom";


const BlogPostItem = ({id, title, author, imageUrl, description, onDelete}) => {

    return ( 
    <section>
        <div>
            <img src={imageUrl} alt={title} />
        </div>
        <div>
            <h2>{title}</h2>
            <h3>{author}</h3>
            <p>{description}</p>
            <NavLink to={`/edit/${id}`}>EDIT✍︎</NavLink>
            <button onClick={() => onDelete(id)}>✘</button>
        </div>

    </section> 
    );
}
 
export default BlogPostItem;