import {useState} from "react";
import {UsersRepository} from "../domain/repositories/UsersRepository";
import {LocalStorageAdapter} from "../domain/repositories/LocalStorageAdapter";
import {useNavigate} from "react-router-dom";

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export const LoginScreen = (props:any) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();
    const goToRegister = () => {
        navigate('/register')
    }

    const login = async (email: string, password: string) => {
        const userRepository = new UsersRepository()
        const authData = await userRepository.signIn(email, password) as LoginResponse;
        console.log(authData)
        if(!authData.accessToken) {
            console.log('wrong email or password')
            return;
        }
        LocalStorageAdapter.saveAuthData(authData.accessToken, authData.refreshToken)
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    return (
        <div className="parentBlock">
            <div className="wrapper">
                <h2>Integrate</h2>
                <h3>Use your social networks entirely by only few clicks</h3>

                <input type="text" className="input" placeholder="email" value={email} onChange={(ev) => setEmail(ev.target.value)}/>
                <input type="password" className="input" placeholder="password" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                <div className="button" onClick={() => login(email, password)}>Sign in</div>
            <div className="button" onClick={goToRegister} >Not registered yet? Sign up</div>
            </div>
        </div>
)
}
