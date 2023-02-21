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
          <Text>This is a Progressive Web application.</Text>
        </div>
      </div>

      <div className={styles.installPromptWrapper}>
        <Title size="m" className="c-neutral95">How to install our PWA on Chrome</Title>
        <br/>
        {showPrompt && <Button variant="primary" size="l" className="margin-v-l" onClick={handlePrompt}>Install our App!</Button>}
        {showPrompt && (
          <><br/><Text size="m" className="c-neutral95">By clicking this button you accept to install our Progressive Web App.</Text></>
          )
        }
      </div>

      <div className={styles.addToHomeScreenWrapper}>
        <Title size="m" className="c-neutral95">How to install our PWA on Safari & Firefox</Title>
        <br/>
        <Text size="m" className="c-neutral95">Safari & Firefox support is &nbsp;
          <a target="_blank" href="https://caniuse.com/?search=PWA" className="link" rel="noreferrer">under development.</a><br />
          You can add this application to your Homescreen to use it like a native app.
        </Text>
        <img className={styles.addToHomeScreenImage} src="add-to-homescreen.jpg" alt="Add to homescreen example" />
      </div>

      <footer className="bg-">
        
      </footer>
    </main>
)};


export default App;
