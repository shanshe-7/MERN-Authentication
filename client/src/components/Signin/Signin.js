import React from 'react';
import { useHistory} from 'react-router-dom';
import { useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import store from '../../redux/store/store';
import { userSignIn } from '../../redux/slices/AuthSlice';
import classes from './Signin.module.css';

export default function Signup() {
    const {handleSubmit, register, errors} = useForm();
    const errorMessage = useSelector(st => st.auth.errorMessage);
    let history = useHistory();

    const onSubmit = async data => {
        store.dispatch(userSignIn(data)).then((signInPromise) => {
            if(signInPromise.type === 'users/signIn/fulfilled'){
                history.push('./dashboard');
            } 
        });
    };
   
    return (
        <> 
            <div className={classes.mainDiv}>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.formInput}>
                        <label id='email'>Email:</label>
                        <input className={classes.input} name='email' ref={register({required: true})} />
                    </div>
                    {errors.email && <p className={classes.errors}>This field is required</p>}
                    <div className={classes.formInput} >
                        <label id='password' >Password:</label>
                        <input type="password" className={classes.input} name='password' autocomplete="current-password" ref={register({required: true})} />
                    </div>
                    {errors.password && <p className={classes.errors}>This field is required</p>}
                        <input 
                        className={classes.submitInput} 
                        type='submit' value='Sign In' />
                    {errorMessage ? <p className={classes.errors}>{errorMessage}</p> : null  }
                </form>
            </div>
        </>
    )
}
