import  './images/hero.jpg';

import { Button, Text, Title } from '@pyxis/react'
import React, {useEffect, useState} from 'react';

import logo from './images/logo.svg';
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
      </header>
      <div className={styles.headingWrapper}>
        <div className={styles.heading}>
          <h1><Title size="xl" weight="bold" className="c-neutral-95">Prima Insurance</Title></h1>
        </div>
      </div>

      <section className="margin-v-3xl padding-v-3xl">
        <Text className="c-neutral-base">This is a Progressive Web application with 1MB background image, just to prove that caching works.</Text>
      </section>
    
      <section className={styles.installPromptWrapper}>
        <Title size="m" weight="bold" className="c-brand-base">How to install our PWA on Chrome</Title>
        <div className={styles.installPromptContentWrapper}>
          <Text size="m" className="c-neutral-95">
            If your browser supports PWA install, you should see a button appear below or be prompted natively by your Browser in the top-right corner of the address bar.<br/>
          </Text>
          {showPrompt && <Button variant="primary" size="l" className="margin-v-l" onClick={handlePrompt}>Install our App!</Button>}  
        </div>
      </section>

      <section className={styles.addToHomeScreenWrapper}>
        <Title size="m" weight="bold" className="c-neutral-125">How to install our PWA on Safari & Firefox</Title>
        <div className={styles.addToHomeScreenContentWrapper}>
          <Text size="m" className="c-neutral-125">Safari & Firefox support is &nbsp;
            <a target="_blank" href="https://caniuse.com/?search=PWA" className="link" rel="noreferrer">under development.</a><br />
            You can add this application to your Homescreen to use it like a native app.
          </Text>
          <img className={styles.addToHomeScreenImage} src="add-to-homescreen.jpg" alt="Add to homescreen example" />
        </div>
      </section>
    </main>
)};


export default App;
