import React from "react";
import classes from "./Footer.module.css";

const footer = (props) => {
  const links = [
    { name: "Home", url: "https://dodcio.defense.gov/" },
    { name: "About DOD CIO", url: "https://dodcio.defense.gov/About-DoD-CIO/" },
    { name: "Defense.gov", url: "https://www.defense.gov/" },
    { name: "FOIA", url: "https://open.defense.gov/Transparency/FOIA.aspx" },
    {
      name: "Section 508",
      url: "https://dodcio.defense.gov/DoDSection508/Std_Stmt.aspx",
    },
    { name: "Strategic Plans", url: "https://dodcio.defense.gov/Library/" },
    {
      name: "Information Quality",
      url:
        "https://www.defense.gov//Resources/DOD-Information-Quality-Guidelines/",
    },
    { name: "No FEAR Act", url: "https://prhome.defense.gov/NoFear/" },
    { name: "Open Government", url: "https://open.defense.gov/" },
    { name: "Plain Writing", url: "https://www.esd.whs.mil/DD/plainlanguage/" },
    {
      name: "Privacy Policy",
      url: "https://dodcio.defense.gov/Home/Privacy-Policy.aspx",
    },
    { name: "Privacy Program", url: "http://dpcld.defense.gov/Privacy/" },
    { name: "DoD Careers", url: "https://dod.usajobs.gov/" },
    { name: "Web Policy", url: "https://dodcio.defense.gov/DoD-Web-Policy/" },
    {
      name: "Public Use Notice",
      url: "https://dodcio.defense.gov/Home/PublicUseNotice.aspx",
    },
    { name: "USA.gov", url: "https://www.usa.gov/" },
    {
      name: "External Links Disclaimer",
      url: "https://dodcio.defense.gov/Home2/ELD.aspx",
    },
    { name: "Contact US", url: "https://dodcio.defense.gov/Contact/" },
  ];

  const makeExternalLinks = links.map((link, index) => {
    return (
      <a
        key={index}
        className="text-center text-white text-xs p-1 hover:bg-light-blue h-auto"
        href={link.url}
      >
        {link.name}
      </a>
    );
  });

  return (
    <footer className="bg-gradient-to-t from-dark-blue to-light-blue py-3">
      <div className="px-4 md:px-24 lg:px-32 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6">
        {makeExternalLinks}
      </div>
    </footer>
  );
};
export default footer;
