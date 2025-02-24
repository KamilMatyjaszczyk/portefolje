import React from 'react'
import {Link} from "react-router-dom";


const InfoBox = ({text, link, btnText}) => (
    <div className= "info-box">
        <p className = "font-medium sm:text-xl text-center"> {text} </p>
        <Link to={link} className="neo-brutalism-white neo-btn inline-block w-auto px-4 py-2 text-center">

            {btnText}
        </Link>
    </div>
)

const renderContent = {
    1: (
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
        Hi. I Am Kamil
        </h1>
    ),
    2: (
        <InfoBox
            text="Studies bla bla bla"
            link="/about"
            btnText="Learn more" />
    ),
    3: (
        <InfoBox
            text="Projects"
            link="/projects"
            btnText="Visit my portfolio" />
    ),
    4: (
        <InfoBox
            text="Job PLS i beg u "
            link="/contact"
            btnText="Get holla at me" />
    ),
}

const HomeInfo = ({currentStage}) => {
    return renderContent[currentStage] || null;
}

export default HomeInfo