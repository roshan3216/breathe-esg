import { useCallback, useState } from 'react';

import earthLogo from '../assets/image 6.png';
import Welcome from './welcome';
import { registerThunk } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const SignUp = () =>{
    const dispatch = useAppDispatch();
    const [user, setUser ] = useState({ email : "" , password : "" ,confirmPassword : "" });
    const userStore = useAppSelector(state => state.auth);
    const [error, setError] = useState(userStore.error);
    const navigate = useNavigate();


    const memoizedNavigate = useCallback(() => navigate, [navigate]);

    const handleChange = (e: any) =>{
        const {name, value} = e.target;
        setUser({...user, [name] : value});
    }

    const signUpSubmit = async(e:any) =>{
        e.preventDefault();
        try {
            await dispatch(registerThunk(user));
            memoizedNavigate()('/home');
        } catch (err) {
            setError(userStore.error);
        }
    }


    return (
        <div className='auth-container'>
            <div className=''>
                <Welcome />
            </div>

            <div className='form-wrapper' >
                <img src= {earthLogo} alt = 'logo' className='earth-logo'/>
                <div className='form-container' style={{width: '273px'}}>

                    <div className='form-header'>
                        <p className='heading'>Sign Up</p>
                        {error && <p className='error'> {error}</p>}
                    </div>
                    
                    <form className='form' id='signup-form' onSubmit={signUpSubmit} style={{marginTop: '20px'}}>
                        <div>
                            <label className='label' htmlFor="email">Email <span style = {{color: "red"}}>*</span> </label>
                            <input className='input' type="email" id ="email" name = "email" placeholder = "Your Email ID" required onChange={handleChange}/>

                        </div>

                        <div>
                            <label className='label' htmlFor="password">Password <span style = {{color: "red"}}>*</span> </label>
                            <input className='input' type="password" id="password" name="password" placeholder = "Password" required onChange={handleChange}/>
                        </div>

                        <div>
                            <label className='label' htmlFor="confirmPassword">Confirm Password <span style = {{color: "red"}}>*</span> </label>
                            <input className='input' type="password" id="confirmPassword" name="confirmPassword" placeholder = "Password" required onChange={handleChange}/>
                        </div>
                    </form>

                    <div className='form-footer' style={{marginTop: "40px"}}>
                        <button type ="submit" form='signup-form' className='button'>Continue</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SignUp;