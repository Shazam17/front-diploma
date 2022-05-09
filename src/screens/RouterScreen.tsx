import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {Message} from "../components/Message";
import {LoginScreen} from "./login-screen";
import {LocalStorageAdapter} from "../domain/repositories/LocalStorageAdapter";
import {RegisterScreen} from "./register-screen";
import {ChatScreen} from "./chat-screen";

export const RouterScreen = (props: any) => {
    const isAuthorized = !!LocalStorageAdapter.getAuthData()

    return ( <BrowserRouter>
        <Routes>
            <Route path="/" element={isAuthorized ? <ChatScreen/> : <LoginScreen />}/>
            <Route path="/login" element={<LoginScreen />}/>
            <Route path="/register" element={<RegisterScreen />}/>
            <Route path="/test" element={<Message />}/>
        </Routes>
    </BrowserRouter>)
}
