import { useEffect, useState } from "react";
import Loader from "react-loaders";
import { Link } from "react-router-dom";
import LogoMcGill from "../../assets/McGillLogo.png";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";

const Home = () => {
    
    return(
        <>
            <div className = "container home-page">
                <div className = "text-zone">
                    <h1>
                        <img src={LogoMcGill} alt = "McGill Exam Scheduler"/>
                    </h1>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Home