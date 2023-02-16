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
    const [prompt, setState] = useState<BeforeInstallPromptEvent | null>(null);

    const promptToInstall = () => {
        if (prompt) {
            return prompt.prompt();
        }
        return Promise.reject(
            new Error('Tried installing before browser sent "beforeinstallprompt" event')
        );
    };

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            console.log('[handleBeforeInstallPrompt] called with', e)
            e.preventDefault();
            setState(e);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    return [prompt, promptToInstall];
}

export default useAddToHomescreenPrompt;