// need to install spinners-react for this component to work
// with docker - must shut down, clear volumes, and rebuild / spinup all container
import { SpinnerCircular } from 'spinners-react';

// included this here and not in quotes.model.ts so that LoadingOverlay component is easily reusable in other apps
interface LoadingOverlayProps {
    enabled:boolean;
    bgColor:string;
    showSpinner:boolean
    spinnerColor:string;
}

const LoadingOverlay = ({enabled, bgColor, showSpinner, spinnerColor}:LoadingOverlayProps) => {
    return (
        (enabled)
        ? 
        <div className="flex justify-center items-center fixed z-50 inset-0 w-full h-full" style={{backgroundColor:bgColor}}>
            {(showSpinner) ? 
            <SpinnerCircular 
                color={spinnerColor}
                secondaryColor={bgColor}
                thickness={150}
                size={75} />
            : <div></div>}
        </div>
        : <div></div>
    );
}

export default LoadingOverlay;