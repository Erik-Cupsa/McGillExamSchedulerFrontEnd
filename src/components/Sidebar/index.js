
import './index.scss'
import { Link, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faCalendar, faPencil, faEnvelope, faClose, faBars} from '@fortawesome/free-solid-svg-icons'
import LogoMcGill from "../../assets/McGillLogo.png"
import LogoSubtitle from '../../assets/exam-sub-logo.png'
import { useState } from 'react'

const Sidebar = () => {
    const [showNav, setShowNav] = useState(false)
    return(
        <div className = 'nav-bar'> 
            <Link className = "logo" to="/"> 
                <img src = {LogoMcGill} alt="logo" />
                <img className="sub-logo" src = {LogoSubtitle} alt="Exam Scheduler" />
            </Link>
            <nav className={showNav ? 'mobile-show' : ""}>
                <NavLink exact="true" activeclassname = "active" to="/">
                    <FontAwesomeIcon icon = {faHome}  onClick={() => setShowNav(false)} />
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "search-link" to="/search">
                    <FontAwesomeIcon icon = {faSearch} onClick={() => setShowNav(false)}/>
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "calendar-link" to="/calendar">
                    <FontAwesomeIcon icon = {faCalendar} onClick={() => setShowNav(false)} />
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "edit-link" to="/edit">
                    <FontAwesomeIcon icon = {faPencil}  onClick={() => setShowNav(false)}/>
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "contact-link" to="/contact">
                    <FontAwesomeIcon icon = {faEnvelope} onClick={() => setShowNav(false)} />
                </NavLink>
                <FontAwesomeIcon icon = {faClose} size = "3x" className="close-icon" onClick={() => setShowNav(false)} />
            </nav>
            <FontAwesomeIcon onClick={() => setShowNav(true)} icon={faBars} color="#ffd700" size="3x" className="hamburger-icon" />
        </div>
    )
}

export default Sidebar 