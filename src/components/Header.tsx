import React, {FC, useEffect, useState} from 'react';

import {Badge} from '@pyxis/react'
import { Link } from 'react-router-dom'
import logo from './../images/logo.svg';
import styles from './Header.module.scss';

const Header:FC<{}> = () => {
    const [networkStatus, setNetworkStatus] = useState(true);
    
    useEffect(() => {
        window.addEventListener('offline', (event) => {
            setNetworkStatus(false)
        });
        
        window.addEventListener('online', (event) => {
            setNetworkStatus(true)
        });
    }, [networkStatus])

    return (
        <header className={styles.header}>
            <img className={styles.logoWrapper} src={logo} alt="This is our logo"/>
            {networkStatus && <Badge variant="success">Online</Badge> }
            {!networkStatus && <Badge variant="error">Offline</Badge> }
            <ul className={styles.menu}>
                <li className={styles.menuItem}><Link to="/" className="link">Home</Link></li>
            </ul>
        </header>
    )
}

export default Header;
