import React from 'react';
import classes from './Footer.module.css';


const footer = (props) => {
    return (
        <div className={classes.footer}>
            <footer className="row section">
                <div className="row box">
                    <section className="col span-1-of-6">
                        <div>
                            <h3 className={classes.text}>DOD Digital Learning Portal</h3>
                        </div>
                    </section>
                    <section className="col span-2-of-6">
                        <div className="row">
                            <h4 className={classes.text}>Links</h4>
                            <ul className="col span-1-of-3">
                                <li className={classes.listLinks}><a href="https://dodcio.defense.gov/" target="_blank" rel="noreferrer" className={classes.links}>Home</a></li>
                                <li className={classes.listLinks}><a href="https://dodcio.defense.gov/About-DoD-CIO/" target="_blank" rel="noreferrer" className={classes.links}>About DOD CIO</a></li>
                                <li className={classes.listLinks}><a href="https://www.defense.gov/" target="_blank" rel="noreferrer" className={classes.links}>Defense.gov</a></li>
                                <li className={classes.listLinks}><a href="https://open.defense.gov/Transparency/FOIA.aspx" target="_blank" rel="noreferrer" className={classes.links}>FOIA</a></li>
                                <li className={classes.listLinks}><a href="https://dodcio.defense.gov/DoDSection508/Std_Stmt.aspx" target="_blank" rel="noreferrer" className={classes.links}>Section 508</a></li>
                                <li className={classes.listLinks}><a href="https://dodcio.defense.gov/Library/" target="_blank" rel="noreferrer" className={classes.links}>Strategic Plans</a></li>
                            </ul>
                            <ul className="col span-1-of-3">
                                <li className={classes.listLinks}><a href="https://www.defense.gov//Resources/DOD-Information-Quality-Guidelines/" target="_blank" rel="noreferrer" className={classes.links}>Information Quality</a></li>
                                <li className={classes.listLinks}><a href="https://prhome.defense.gov/NoFear/" target="_blank" rel="noreferrer" className={classes.links}>No FEAR Act</a></li>
                                <li className={classes.listLinks}><a href="https://open.defense.gov/" target="_blank" rel="noreferrer" className={classes.links}>Open Government</a></li>
                                <li className={classes.listLinks}><a href="https://www.esd.whs.mil/DD/plainlanguage/" target="_blank" rel="noreferrer" className={classes.links}>Plain Writing</a></li>
                                <li className={classes.listLinks}><a href="https://dodcio.defense.gov/Home/Privacy-Policy.aspx" target="_blank" rel="noreferrer" className={classes.links}>Privacy Policy</a></li>
                                <li className={classes.listLinks}><a href="http://dpcld.defense.gov/Privacy/" target="_blank" rel="noreferrer" className={classes.links}>Privacy Program</a></li>
                            </ul>
                            <ul className="col span-1-of-3">
                                <li className={classes.listLinks}><a href="https://dod.usajobs.gov/" target="_blank" rel="noreferrer" className={classes.links}>DoD Careers</a></li>
                                <li className={classes.listLinks}><a href="https://dodcio.defense.gov/Home2/ELD.aspx" target="_blank" rel="noreferrer" className={classes.links}>External Links Disclaimer</a></li>
                                <li className={classes.listLinks}><a href="https://dodcio.defense.gov/Home/PublicUseNotice.aspx" target="_blank" rel="noreferrer" className={classes.links}>Public Use Notice</a></li>
                                <li className={classes.listLinks}><a href="hhttps://www.usa.gov/" target="_blank" rel="noreferrer" className={classes.links}>USA.gov</a></li>
                                <li className={classes.listLinks}><a href="https://dodcio.defense.gov/DoD-Web-Policy/" target="_blank" rel="noreferrer" className={classes.links}>Web Policy</a></li>
                                <li className={classes.listLinks}><a href="https://dodcio.defense.gov/Contact/" target="_blank" rel="noreferrer" className={classes.links}>Contact US</a></li>
                            </ul> 
                        </div>
                    </section>
                    <section className="col span-1-of-6">

                    </section>
                    <section className="col span-2-of-6">
                        <div>
                            <h3 className={classes.text2}>STAY CONNECTED</h3>
                            <h3 className={classes.text2}>___________________________________________</h3>
                            <ul className="col span-1-of-3">
                                <li className={classes.listLinks1}><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className={classes.links}>Facebook</a></li>
                                <li className={classes.listLinks1}><a href="https://twitter.com/Dod_cio" target="_blank" rel="noreferrer" className={classes.links}>Twitter</a></li>
                            </ul>
                            <ul className="col span-1-of-3">
                                <li className={classes.listLinks1}><a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className={classes.links}>YouTube</a></li>
                                <li className={classes.listLinks1}><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className={classes.links}>Instagram</a></li>
                            </ul>
                            <ul className="col span-1-of-3">
                                <li className={classes.listLinks1}><a href="https://www.flickr.com/" target="_blank" rel="noreferrer" className={classes.links}>Flickr</a></li>
                                <li className={classes.listLinks1}><a href="https://www.defense.gov/Explore/Inside-DOD/" target="_blank" rel="noreferrer" className={classes.links}>Blog</a></li>
                            </ul> 
                        </div>
                    </section>
                </div>
            </footer>
        </div>
    )
}
export default footer;
