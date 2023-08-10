import { NavLink } from "react-router-dom";

const NavBar = () => {
    return ( 
        <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blog">Blog</NavLink>
        </>
     );
}
 
export default NavBar;