import React from "react";
import Link from "next/link";

const Footer = () => {

    const emailAddress = "contact@cerberupdate.fr";
    //const websiteUrl = "http://www.cerberupdate.fr";
    const websiteUrl ="https://www.google.fr";
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
            {/* Éventuel contenu supplémentaire à droite */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
