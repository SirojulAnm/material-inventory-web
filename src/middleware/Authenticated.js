import { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { tokenState } from '../store/index.js';
import { useRecoilValue } from "recoil";

function Authenticated({children}) {
    const auth = useRecoilValue(tokenState)

    useEffect(() => {
        if (!auth.check) {
            Redirect('/login')
        }
    }, [auth.check])

    return children
}

export default Authenticated;