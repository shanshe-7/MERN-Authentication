import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import store from '../../redux/store/store';
import { useHistory} from 'react-router-dom';
import {signOuth, clearErrosMessages } from '../../redux/slices/AuthSlice';
import classes from './Navbar.module.css'

export default function Navbar() {
    let history = useHistory();
    const isSign = useSelector(st => st.auth.isSign);

    const handleChange = (e) => {
        let val = e.target.value;
        if(val === 'signin'){
            history.push('/signin');
            store.dispatch(clearErrosMessages());
        }else if (val === '/'){
            history.push('/');
        }else if (val === 'signout'){
            history.push('/');
            store.dispatch(signOuth());
        }else if(val === 'signup'){
            history.push('/signup');
            store.dispatch(clearErrosMessages());
        }else if (val === 'dashboard'){
            history.push('/dashboard');
        }
    }

    const handleClick = () => {
        store.dispatch(clearErrosMessages());
    }

    const handleSignOuth = (e) => {
        store.dispatch(signOuth());
    }

    
    return (
        <>
            <nav className={classes.navbar}>
                <ul className={classes.AuthAndDashboard}>
                    <li className={classes.AuthAndDashboardItems}>
                        <Link className={classes.Links} to="/">Home</Link>
                    </li>
                    <li className={classes.AuthAndDashboardItems}>
                        <Link style={{backgroundColor: isSign ? ' #00ff7f' : '#ec5990', 
                                     color:  isSign ? '#050709': 'white' }} 
                            className={classes.Links} to ='/dashboard' > Secret </Link>
                    </li>
                </ul>

                <ul className={classes.sign}>
                    { isSign ?
                        <li onClick={handleSignOuth} className={classes.AuthAndDashboardItems}>
                            <Link className={classes.Links} to='/'>Sign Out</Link>
                        </li> :
                        <>
                            <li onClick={handleClick} className={classes.AuthAndDashboardItems}>
                                <Link className={classes.Links} to='/signin'>Sign In</Link>
                            </li>
                            <li onClick={handleClick} className={classes.AuthAndDashboardItems}>
                                <Link className={classes.Links} to='/signup'>Sign Up</Link>
                            </li>
                        </>
                    }
                </ul>
                <select onChange={handleChange} className={classes.Select}> 
                    <option defaultChecked value="/">Home</option>
                    <option value="dashboard">Secret</option>
                    {
                        isSign ? <option value="signout">Sign Out</option> :
                        <> 
                            <option value="signin">Sign In</option> 
                            <option value="signup">Sign Up</option>
                        </>
                    } 
            </select> 
            </nav>
        </>
    )
}
