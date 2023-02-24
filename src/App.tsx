import  './images/hero.jpg';

import { Button, Text, Title } from '@pyxis/react'
import React, {useEffect, useState} from 'react';

import logo from './images/logo.svg';
import styles from './App.module.scss';
import useAddToHomescreenPrompt from './hooks/useBeforeInstallPrompt'

const getBrowser = (userAgent: string): string | null => {
  if (userAgent.match(/chrome|chromium|crios/i)) {
    return "Google Chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    return "Mozilla Firefox";
  }  else if (userAgent.match(/safari/i)) {
    return "Apple Safari";
  } else if (userAgent.match(/opr\//i)) {
    return "Opera";
  } else if (userAgent.match(/edg/i)) {
    return "Microsoft Edge";
  } else {
    return null;
  }
}


const App = ():React.ReactElement =>  {
  const [prompt, handlePrompt] = useAddToHomescreenPrompt();
  const [showPrompt, setShowPrompt] = useState(false);
  const [browser, setBrowser] = useState<string|null>(null)
  const [geoCoords, setGeoCoords] = useState<{lat: number, lon: number} | null>(null)
  const [uploadedContent, setUploadedContent] = useState('')

  // Show the install prompt if not already installed.
  useEffect(() => { 
    if(prompt) {
      setShowPrompt(true); 
    }
  }, [prompt])

  useEffect(() => {
    setBrowser(getBrowser(navigator.userAgent))
  }, [])

  useEffect(() => {
    const onSuccess = (position: {coords: {latitude: number, longitude: number}}) => 
      setGeoCoords({lat: position.coords.latitude, lon: position.coords.longitude})
    const onError = () => setGeoCoords(null)

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
  }, [])

  const handleUpload = async () => {
    // @ts-ignore next-line
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const fileContent = await file.text();

    setUploadedContent(fileContent)
  }

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
        <Text size="l" className="c-neutral-base">
          This is a Progressive Web application with 1MB background image, just to prove that caching works.
          <br />
          { browser && <b>{`I've detected that you're currently using ${browser}.`}</b>}
          <br/>
          { geoCoords && <b>{`Your latitude is ${geoCoords.lat} while your longitude is ${geoCoords.lon}.`}</b>}
          <br />
          In this application you'll find a showcase of the capabilities of a PWA once it has been installed in your device. 
        </Text>
      </section>
    
      <section className={styles.installPromptWrapper}>
        <Title size="m" weight="bold" className="c-brand-base">How to install our PWA on Chrome</Title>
        <div className={styles.installPromptContentWrapper}>
          <Text size="m" className="c-neutral-95">
            If your browser supports PWA and you didn't install it already, you should see a button appear below or be prompted natively by your Browser in the top-right corner of the address bar.<br/>
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

      <section className={styles.fileSystemWrapper}>
        <Title size="m" weight="bold" className="c-neutral-125">File System access</Title>
        <div className={styles.fileSystemContentWrapper}>
          <Text size="m" className="c-neutral-125">
            You can try to upload any file and see how PWA can safely access your File System.
            <br/> 
            This can be done only in response of an user interaction, for safety reasons.
            <br/>
            <Button variant="secondary" size="m" className="margin-v-l" onClick={handleUpload}>Upload</Button>
            
            <div className="form-item__wrapper">
              <div className="form-field" id="default-field">
                <textarea aria-invalid="false" className="form-field__textarea" id="uploaded_file" name="uploaded_file" placeholder="Content of your uploaded file will be shown here." defaultValue={uploadedContent}/>
              </div>
            </div>
          </Text>
        </div>
      </section>
    </main>
)};


export default App;
