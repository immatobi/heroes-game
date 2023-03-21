import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const NetworkUI = () => {

    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    const goBack = (e: any) => {
        
        if(e) e.preventDefault();
        navigate(-1);

    };

    return (
        <>

            <div className="not-found bg-brandxp-dark">

                <div className="container ui-text-center">

                    <img src="../../../images/icons/error.svg" width="180px" alt="not-found" />
                    <h3 className="mrgt1 font-metromedium fs-27 onwhite mrgb">Oops! Network error.</h3>
                    <p className="font-matterlight fs-14 onwhite mrgb2">There's an error network is unstable. Please refresh</p>
                    <Link to="" onClick={(e) => goBack(e)} className="btn md ghost onwhite font-matterbold fs-15">Go Back </Link>

                        
                </div>

            </div>
        </>
    )
  
}

export default NetworkUI