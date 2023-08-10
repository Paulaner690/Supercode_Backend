import axios from "axios";
import { useState } from "react";

const EditComponent = ({id, title, author, imageUrl, description}) => {
    const [titleInput, setTitleInput] = useState(true);
    const [authorInput, setAuthorInput] = useState(true);
    const [imageInput, setImageInput] = useState(true);
    const [descriptionInput, setDescriptionInput] = useState(true);

    const updatePost = async (e) => {
        const formData = new FormData(e.target);
        e.preventDefault();
    
        console.log(formData);
        const response = await axios.put(`/api/updatePost/${id}`, formData);
        console.log(response);
    
        setTitleInput(true);
        setAuthorInput(true);
        setImageInput(true);
        setDescriptionInput(true);
        setRefresh((prev) => !prev);

        e.target.reset();

    }
    return ( 
        <>
        {id ? (
            <section>
                <form onSubmit={updatePost}>
                    <div>
                        <label htmlFor="image"><img src={imageUrl} alt={title} /></label>
                        <input 
                            type="file"
                            name="image"
                            placeholder={imageUrl}
                            id="image"/>
                        <button onClick={() => {setImageInput((prev) => !prev);
                        }}>Edit</button>
                    </div>
                    <div>
                        <label htmlFor="title"><h3>{title}</h3></label>
                        <input 
                            type="text"
                            name="title"
                            placeholder="Title"
                            id="title"
                            defaultValue={title} />
                        <button onClick={() => {setTitleInput((prev) => !prev);
                        }}>Edit</button>
                    </div>
                    <div>
                        <label htmlFor="author"></label>
                        <input 
                            type="text"
                            name="author"
                            placeholder="author"
                            id="author"
                            defaultValue={author} />
                        <button onClick={() => {setAuthorInput((prev) => !prev);
                        }}>Edit</button>
                    </div>
                    <div>
                        <h2>Beschreibung:</h2>
                        <label htmlFor="description"> <h3>{description}</h3></label>
                        <input 
                            type="text"
                            name="description"
                            placeholder="Description"
                            id="description"
                            defaultValue={description} />
                        <button onClick={() => {setDescriptionInput((prev) => !prev);
                        }}>Edit</button>
                    </div>

                    <button>Publish</button>

                </form>
            </section>

        ) : (
            <> </>
        )
    }
        </>
     );
}
 
export default EditComponent;