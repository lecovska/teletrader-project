import React, { useContext } from "react";
import "./header.css";
import { loginCtx } from "../../Pages/context";
import {Link} from "react-router-dom";


const Header = () => {
    const { isloggedIn, setIsLoggedIn } = useContext(loginCtx);

    function clickHandler() {

        setIsLoggedIn(true);

    }

    return (
        <div className="header">
           <Link to="/"><h1>Home</h1></Link> 
            {!isloggedIn ?
                (<button onClick={clickHandler}>Login</button>) : (<Link to="/favourites"><button className="header-link">Favorites</button></Link>)}
        </div>
    )
}

export default Header;
