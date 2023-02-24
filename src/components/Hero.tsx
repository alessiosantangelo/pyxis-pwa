import  './../images/hero.jpg';

import React, {FC} from 'react';

import { Title } from '@pyxis/react'
import styles from './Hero.module.scss';

const Hero:FC<{}> = () => (
    <div className={styles.heroWrapper}>
        <div className={styles.hero}>
            <h1><Title size="xl" weight="bold" className="c-neutral-95">Prima Insurance</Title></h1>
        </div>
    </div> 
)

export default Hero;
