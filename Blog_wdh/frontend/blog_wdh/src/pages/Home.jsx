import { NavLink } from "react-router-dom";
import NavBar from "../components/Nav";

const Home = () => {
    return ( 
        <>
            <NavBar/>
            <h1>WELCOME HOME</h1>
            <NavLink to="/blog">Zum Blog</NavLink>
        </>
     );
}
 
export default Home;