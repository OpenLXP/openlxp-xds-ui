import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom'
import logo from '../../resources/internal/dodLogo.png';
import searchButton from '../../resources/internal/search.svg';


const Header = (props) => {
    const [ state, setState] = React.useState({
        keyword: ''
    });

    return (
        <div className={classes.mainDiv} >
        <div className={classes.div} >
            <img className={classes.logo} src={logo} alt="logo" />
            <div className={classes.div1}>
                <p> <b className={classes.title}>Digital Learning Portal</b> </p>
                <p> <b className={classes.title1}>U.S. Department of Defense</b> </p>
            </div>
            <div className={classes.div2} >
                <div className={classes.topLeft}>
                    <NavLink to='/signIn' className={classes.signIn}>Sign in</NavLink>
                    <div className={classes.inputwithicon}>
                        <input className={classes.text} type="text" placeholder="Keyword search" value={state.keyword}
                            onChange={event => {
                                const newVal = event.target.value;
                                setState(previousState => ({keyword: newVal}))
                            }}/>
                        <Link
                            to={{
                                pathname: "/search/",
                                search: "?keyword=" + state.keyword + "&p=" + 1
                            }}className="btn">
                            <ion-icon name="search-outline"></ion-icon>
                            </Link>
                    </div>
                </div>
            </div>         
        </div>
        </div>
    )
    
}

export default Header;
