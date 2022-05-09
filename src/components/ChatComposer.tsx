import {useState} from "react";
import {ChatsRepository} from "../domain/repositories/ChatsRepository";
import send from '../play.svg'
interface ChatComposerProps {
    chatId: string;
    integrationId: string;
    chatsRepository: ChatsRepository;
}

export const ChatComposer = (props: ChatComposerProps) => {

    const [text, setText] = useState('')

    const sendMessage = async (messageText: string) => {
        if(messageText.length > 0){
            await props.chatsRepository.sendMessages(props.chatId, messageText, props.integrationId);
            setText('')
        }
    }

    return ( <div className="composer">
        <div className="send-button"/>
        <input type="text"
               className="message-input"
               placeholder="enter message...."
               value={text}
               onChange={(ev) => {
                   if(props.chatId){
                       setText(ev.target.value)
                   }
               }}/>
        <img
            style={{
                width: 40,
                height: 40
            }}
            src={send}
            className="send-button" onClick={() => {
            console.log('send')
            sendMessage(text)
        }}/>
    </div>);
}
