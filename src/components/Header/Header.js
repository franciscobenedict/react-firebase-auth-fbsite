import React, { useContext, useState, useEffect } from "react";
import routes from "../../store/routes";
import { Link } from "react-router-dom";
import { AuthContext } from "../../index";
import firebaseConfig from "../../store/base";
import * as firebase from "firebase";
import { CSSTransition } from "react-transition-group";

const Header = () => {
  const {isLoggedIn} = useContext(AuthContext);

  //USER DETAILS
  const user = JSON.parse(window.sessionStorage.getItem(`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`));
  let [userImage, userName, userEmail] = '';
  if (isLoggedIn) {
    // console.log('user', user);
    userImage = user.photoURL ? user.photoURL : `https://ukdj.imgix.net/455a0284eb7a4194d11239e17b11ab2a_/generic-user-profile_354184.png?auto=compress%2Cformat&ixlib=php-1.2.1&s=c64c1c0b04a6a8e47171f09b66a258bf`;
    userName = user.displayName ? user.displayName : ``;
    userEmail = user.email ? user.email : ``;
  }

  // console.log('isLoggedIn', isLoggedIn);
  const logout = () =>{
    // let path = `newPath`;
    firebase.auth().signOut().then(function() {
      // history.push('/');
      window.location.href="/"
    }).catch(function(error) {
      // An error happened.
    });
  }

  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const closeNav = () => {
    if (isNavVisible) {
      toggleNav();
    }
  }

  return (
    <header className="Header">
      <img src={require("../../assets/images/react-logo.png")} className="Logo" alt="logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          {
            !isLoggedIn &&
            routes.map((route, i) => (
              <span key={i}>
                <Link to={route.path} onClick={closeNav}>{route.name}</Link>
              </span>
            ))
          }

          {isLoggedIn && <Link to="/home" onClick={closeNav}>Home</Link> }
          {isLoggedIn && <Link to="/reports" onClick={()=>{closeNav();closeNav()}}>Reports</Link> }

          { !!user &&
            <div className="user_details">
              <div className="user_details_image">
                <img
                  src={userImage}
                  width="70"
                  height="70"
                  alt="avatar"
                />
              </div>
              <div className="user_details_text">
                <p>{userName}</p>
                <p>{userEmail}</p>
              </div>
            </div>
          }

          {isLoggedIn && <Link to="" className="small_font_size logout" onClick={logout}>Logout</Link> }

        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        <span role="img" aria-label="hamburger">🍔</span>
      </button>
    </header>
  )
}

export default Header;
