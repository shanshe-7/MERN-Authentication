import React from 'react';
import { useHistory} from 'react-router-dom';
import { useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import store from '../../redux/store/store';
import { userSignUp} from '../../redux/slices/AuthSlice';
import classes from './Signup.module.css';

export default function Signup() {
    const {handleSubmit, register, errors} = useForm();
    const errorMessage = useSelector(st => st.auth.errorMessage);
    let history = useHistory();

    const onSubmit = data => {
        store.dispatch(userSignUp(data)).then((signUpPromise) => {
            if(signUpPromise.type === 'users/signUp/fulfilled'){
                history.push('./dashboard');
            } 
        });
        
    };
   
    return (
        <> 
            <div className={classes.mainDiv}>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.formInput} >
                        <label id='firstname' >Firstname:</label>
                        <input className={classes.input}  name='firstname'  autoComplete="on" ref={register({required: true})} />
                    </div>
                    {errors.firstname && <p className={classes.errors}>This field is required</p>}
                    <div className={classes.formInput} >
                        <label id='lastname' >Lastname:</label>
                        <input className={classes.input}  name='lastname'  autoComplete="on" ref={register({required: true})} />
                    </div>
                    {errors.lastname && <p className={classes.errors}>This field is required</p>}
                    <div className={classes.formInput}>
                        <label id='email' >Email:</label>
                        <input className={classes.input}  name='email'  autoComplete="on" ref={register({required: true})} />
                    </div>
                    {errors.email && <p className={classes.errors}>This field is required</p>}
                    <div className={classes.formInput} >
                        <label id='password'>Password:</label>
                        <input className={classes.input} name='password'  autoComplete="on" ref={register({required: true})} />
                    </div>
                    {errors.password && <p className={classes.errors}>This field is required</p>}
                    
                    <input className={classes.submitInput} type='submit'  autoComplete="on" value='Sign Up' />
                    {errorMessage ?<p className={classes.errors}>{errorMessage}</p>: null  }
                   
                </form>
                
            </div>
        </>
    )
}
