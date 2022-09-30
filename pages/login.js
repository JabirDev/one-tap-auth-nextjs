import { useRouter } from 'next/router'
import Head from 'next/head'
import useGoogleIdentify from '../hooks/useGoogleIdentify'

const LoginPage = () => {
    const router = useRouter()
    const nextAuthOpt = {
        redirect: true
    }

    const googleOpt = {
        isOneTap: false
    }

    const {isSignedIn} = useGoogleIdentify({
        nextAuthOpt, googleOpt
    })

    if(isSignedIn){
        router.push('/')
    }

    return (
        <div className='container'>
            <Head>
                <title>Login Page</title>
            </Head>
            <div className='main'>
                <h2>Login Page</h2>
                <div className='g_id_signin'
                    data-type='standard'
                    data-size='medium'
                    data-theme='outline'
                    data-text='continue_with'
                    data-shape='pill'
                    data-locale='id'
                    data-logo_alignment='left'
                />
            </div>
        </div>
    )
}

export default LoginPage