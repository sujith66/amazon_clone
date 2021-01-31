import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link ,useHistory} from "react-router-dom";
import "./Header.css";
import { useStateValue } from "../Context/ContextProvider";
import { auth } from "../../firebase";

const Header = () => {

  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  
  const handleAuthenticationforUser = ()=>{
    if(user){
      // auth.signOut().then( _ =>{
      //   history.push('/');
      // });
      auth.signOut();
    }
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon logo"
        />
      </Link>

      <div className="header__search">
        <input type="text" className="header__searchInput" />{" "}
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={ !user && "/login"}>
          <div className="header__option" onClick={handleAuthenticationforUser}>
            <h3 className="header__optionOne">Hello {user ? user?.email : 'Guest'}</h3>
            <h2 className="header_optionTwo">
              {user ? "Sign out" : "Sign In"}
            </h2>
          </div>
        </Link>
        <Link to='/orders'>
        <div className="header__option">
          <h3 className="header__optionOne">Returns</h3>
          <h2 className="header_optionTwo">& Orders</h2>
        </div>
        </Link>
        <div className="header__option">
          <h3 className="header__optionOne">Your</h3>
          <h2 className="header_optionTwo">Prime</h2>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartIcon className="header_c_artIcon" />
            <h2 className="header__optionTwo header__alignCount">
              {basket?.length}
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
