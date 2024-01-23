import React from "react";

const Footer = () => {

    const emailAddress = "contact@cerberupdate.fr";
    //const websiteUrl = "http://www.cerberupdate.fr";
    const websiteUrl ="https://glorious-creature-d20.notion.site/841068b1e8b94db4bebe2f7342c6837e?v=a6387681b325453d969fa5b3db1f6f6c&pvs=4";
    const displayTextweb = "www.cerberupdate.fr";
    const websiteML ="https://www.economie.gouv.fr/entreprises/site-internet-mentions-obligatoires"
    const displayML = "Mentions Légales"

  return (
    <>
      <footer>
        <div className="w-full h-20 bg-darkPurple bottom-0 flex flex-col justify-center items-center text-white">
          <p className="text-center mt-7 text-xs">

            © 2024 CerberUpdate | <a href={websiteML} target="_blank" rel="noopener noreferrer" > {displayML} </a> | Contact :{" "}
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a> | Site web :{" "}
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
              {displayTextweb}
            </a>
          </p>
          <div className="flex justify-between items-center h-full">
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
