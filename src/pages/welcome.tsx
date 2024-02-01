import BreatheEsgLogo from '../assets/Logo_horizontal_1 White.png';

const Welcome: React.FC = () =>{

    return (
        <div className = 'welcome-container'>
            <p className ='welcome-message'>Welcome To </p>
            <img src = {BreatheEsgLogo} alt = 'logo' width = '348px' height ='42px' />
            <p className = 'tagline'>We help you track your organisations metrics as per the ESG Guidelines</p>
            <p className = 'tagline-footer'>Sounds Interesting? <span style={{color:"#4FA556"}}>Get in touch! </span></p>
            
        </div>
    );
}

export default Welcome;