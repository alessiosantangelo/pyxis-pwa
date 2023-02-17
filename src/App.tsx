import { Button, Text, Title } from '@pyxis/react'
import React, {useEffect, useState} from 'react';

import logo from './logo.svg';
import styles from './App.module.scss';
import useAddToHomescreenPrompt from './hooks/useBeforeInstallPrompt'

const App = ():React.ReactElement =>  {
  const [prompt, handlePrompt] = useAddToHomescreenPrompt();
  const [showPrompt, setShowPrompt] = useState(false);

  // Show the install prompt if not already installed.
  useEffect(() => { 
    if(prompt) {
      setShowPrompt(true); 
    }
  }, [prompt])

  return (
  <main className="container container-responsive align-content-center">
    <header className={styles.header}>
      <img className={styles.logoWrapper} src={logo} alt="This is our logo"/>
      
      <ul className={styles.menu}>
        <li className={styles.menuItem}><a href="/" className="link">Home</a></li>
        <li className={styles.menuItem}><a href="/about" className="link">About</a></li>
      </ul>
    </header>
    <div className={styles.heading}>
      <h1><Title size="xl" weight="bold" className="c-brand-base">Prima Insurance</Title></h1>
      <h2><Title size="m" className="c-neutral95">Insurance, as you've never experienced it before</Title></h2>
      <div className="margin-v-xl">
        <Text>Lorem ipsum dolor sit amet.</Text>
      </div>
    </div>

    <div className={styles.installPromptWrapper}>
      {showPrompt && <Button variant="primary" size="l" onClick={handlePrompt}>Install our App!</Button>}
      {showPrompt && (
        <><br/><Text size="m" className="c-neutral95">By clicking this button you accept to install our App.</Text></>
        )
      }
    </div>
  </main>
)};


export default App;
