import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';


import { loginThunk } from '../features/auth/authSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import googleIcon from '../assets/google logo 1 (1).png'
import twitterIcon from '../assets/google logo 1.png';
import earthLogo from '../assets/image 6.png';
import Welcome from './welcome';

const Login: React.FC = () =>{
    const [user, setUser ] = useState({ email : "" , password : "" ,});
    const dispatch = useAppDispatch();
    const userStore = useAppSelector( state => state.auth)
    const [error, setError] = useState(userStore.error);
    const navigate = useNavigate();
    const memoizedNavigate = useCallback(() => navigate, [navigate])

    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setUser({...user, [name] : value});

    }

    const loginSubmit = async(e: any) =>{
        e.preventDefault();
        console.log(user, '[loginSubmit]-[user]');
        
        try {
            await dispatch(loginThunk(user));
            memoizedNavigate()('/home');
        } catch (err) {
            setError(userStore.error);
        }
    }

    return (
        <div className='auth-container'>
            <div>
                <Welcome />
            </div>

            <div className='form-wrapper'>
                <img src= {earthLogo} alt = '' className='earth-logo'/>
                <div className='form-container'>

                    <div className='form-header'>
                        <p className='heading'>Login</p>
                        <p className='heading-message'>Enter your registered Email ID to continue</p>
                        {error && <p className='error'> {error}</p>}
                    </div>
                    
                    <form className='form' id='login-form' onSubmit={loginSubmit}>
                        <div>
                            <label className='label' htmlFor="email">Email <span style = {{color: "red"}}>*</span> </label>
                            <input className='input' type="email" id ="email" name = "email" placeholder = "Your Email ID" required onChange={handleChange}/>

                        </div>

                        <div>
                            <label className='label' htmlFor="password">Password <span style = {{color: "red"}}>*</span> </label>
                            <input className='input' type="password" id="password" name="password" placeholder = "Password" required onChange={handleChange}/>
                        </div>
                    </form>

                    <div className='external-auth-wrapper'>
                        <div className='external-auth-container' >
                            <img src ={twitterIcon} alt = 'googleIcon' width='17px' height= '24px'/>
                            <p>Sign up with Google</p>
                        </div>

                        <div className='external-auth-container' style={{display: 'flex', flexDirection: 'row', alignItems : "center" , gap: '5px'}}>
                            <img src ={googleIcon} alt = 'googleIcon'width='17px' height= '24px' />
                            <p>Sign up with Twitter</p>
                        </div>
                    </div>


                    <div className='form-footer'>
                        <p>Having Trouble logging in? <span style={{color: '#4FA556', textDecoration: "underline"}} >Contact Us</span></p>
                        <button type ="submit" form='login-form' className='button'>Continue</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Login;