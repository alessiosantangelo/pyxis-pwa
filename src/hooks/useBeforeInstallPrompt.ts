import React, {useEffect, useState} from 'react'

// From https://stackoverflow.com/a/67171375
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}
 
type AddToHomeScreenEffect = [BeforeInstallPromptEvent | null, () => void]

const useAddToHomescreenPrompt = ():AddToHomeScreenEffect =>  {
    const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

    // Handler to be used in the Component.
    const promptToInstall = () => {
        if (promptEvent) {
            return promptEvent.prompt();
        }
        return Promise.reject(
            new Error('Tried installing before browser sent "beforeinstallprompt" event')
        );
    };

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            // Event should be prevented in order to show custom install button.
            e.preventDefault();
            setPromptEvent(e);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    // Return the intercepted event and the callBack to be invoked. 
    // Components can listen for changes on promptEvent.
    return [promptEvent, promptToInstall];
}

export default useAddToHomescreenPrompt;