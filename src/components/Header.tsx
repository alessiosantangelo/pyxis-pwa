import { Link } from 'react-router-dom'
import React from 'react';
import logo from './../images/logo.svg';
import styles from './Header.module.scss';

const Header = ():React.ReactElement => (
    <header className={styles.header}>
        <img className={styles.logoWrapper} src={logo} alt="This is our logo"/>
        <ul className={styles.menu}>
            <li className={styles.menuItem}><Link to="/" className="link">Home</Link></li>
            <li className={styles.menuItem}><Link to="/about" className="link">About</Link></li>
        </ul>
    </header>
)

export default Header;
