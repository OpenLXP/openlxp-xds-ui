import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navbar.module.css";

const Navbar = (props) => {
  // data struct for button name and routes to them
  const buttonNames = [
    { title: "Home", route: "/" },
    { title: "About", route: "/about" },
    { title: "Resources", route: "/resources" },
    { title: "Help", route: "/help" },
  ];

  // Generating the buttons
  const listItems = buttonNames.map((item, index) => {
    return (
<<<<<<< HEAD
      <li className={classes.navItemWrapper} key={index}>
=======
      <li className={classes.navItemWrapper} key={item.title}>
>>>>>>> accessibility
        <NavLink
          exact
          to={item.route}
          className={classes.navItem}
          activeClassName={classes.navItemWrapperActive}
        >
          {item.title}
        </NavLink>
      </li>
    );
  });

  return (
    <>
      <div className={classes.nav}>
        <ul className={classes.navMain}>{listItems}</ul>
      </div>
      <ul className={classes.nav}>
        <li className={classes.navItem}></li>
      </ul>
    </>
  );
};

export default Navbar;
