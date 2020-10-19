import React, {useEffect} from 'react';
import store from '../../redux/store/store';
import { useSelector } from 'react-redux';
import { getSecretData } from '../../redux/slices/AuthSlice';
import classes from './Dashboard.module.css';

export default function Signup() {

    const st = useSelector(st => st.auth);

    useEffect(() => {
       const fetchSecret = async () => {
           store.dispatch(getSecretData());
       }
       fetchSecret();
    }, [] );
    return (
        <>  
            {
                !st.isSign ?
                <div className={classes.loaderDiv}>
                  <div className={classes.loader}></div>
                </div> : 
                <p className={classes.Dashboard}>
                    {`You now can access secret: ${st.secret} `}
                </p> 
               
            }
        </>
    )
}