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
      <li className={classes.navItemWrapper} key={item.title}>
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
      <div className="px-4 md:px-24 lg:px-32  xl:px-56 bg-gradient-to-t from-dark-blue to-light-blue">
        <div className="flex flex-row">{listItems}</div>
      </div>
      <div className="bg-gradient-to-t from-dark-blue to-light-blue h-5" />
    </>
  );
};

export default Navbar;
