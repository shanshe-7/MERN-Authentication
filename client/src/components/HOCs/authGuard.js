import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';



export default (OriginalComponent) => {
    function MixedComponent() {

        const st = useSelector(st => st.auth);
        let history = useHistory();

        useEffect(() => {
           if ( !st.isSign && !st.JWTToken) {
            history.push('/');
           } 
        }, [ st.isSign, st.JWTToken] );
        return <OriginalComponent />
    }
    
    return MixedComponent;
}

