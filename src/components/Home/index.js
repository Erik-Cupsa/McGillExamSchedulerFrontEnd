import { useEffect, useState } from "react";
import Loader from "react-loaders";
import { Link } from "react-router-dom";
import LogoMcGill from "../../assets/McGillLogo.png";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";

const Home = () => {
    const [letterClass, setLetterClass] = useState("text-animate")
    const welcomeArray1 = "Welcome to".split("");
    const welcomeArray2 = "McGill Exam Scheduler!".split("");
    
    useEffect(() => {
        const timerId = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 4000);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return(
        <>
            <div className = "container home-page">
                <div className = "text-zone">
                    <h1>
                        <img src={LogoMcGill} alt = "McGill Exam Scheduler"/>
                        <br />
                        <AnimatedLetters letterClass={letterClass} strArray={welcomeArray1} idx={12} />
                        <br />
                        <AnimatedLetters letterClass={letterClass} strArray={welcomeArray2} idx = {14} />
                    </h1>
                    <h2>Add your exams to your calendar with ease!</h2>
                    <Link to="/search" className="flat-button">GET STARTED</Link>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Home