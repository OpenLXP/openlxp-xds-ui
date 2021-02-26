import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom'
import logo from './dodLogo.png';
import searchButton from './search.svg';


const Header = (props) => {
    const [ state, setState] = React.useState({
        keyword: ''
    });

    return (
        <div className={classes.div} >
            <img className={classes.logo} src={logo} alt="logo" />
            <div className={classes.div1}>
                <p> <b className={classes.title}>Digital Learning Portal</b> </p>
                <p> <b className={classes.title1}>U.S. Department of Defense</b> </p>
            </div>
            <div className={classes.div2} >
            <form className={classes.search}>
                {/* <input className={classes.text} type="text" placeholder= "Keyword search" value={this.state.value} onChange={this.handleChange} /> */}
                <input className={classes.text} type="text" placeholder="Keyword search" value={state.keyword}
                    onChange={event => {
                        const newVal = event.target.value;
                        setState(previousState => ({keyword: newVal}))
                    }}/>
                <input className={classes.searchImage} type="image" name="Submit" src={searchButton} alt="Submit" />
                <Link className={classes.searchImage} type="image" name="Submit" src={searchButton} alt="Submit" to={{
                        pathname: "/search/",
                        search: "?q=" + state.keyword
                    }}></Link>
            </form>
            
            <NavLink to='/signIn' className={classes.signIn}>Sign in</NavLink>
            </div>         
        </div>
    )
    
}

export default Header;
