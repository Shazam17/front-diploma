import {Chat} from "../components/chat";
import {ChatItem} from "../components/ChatItem";
import {useEffect, useRef, useState} from "react";
import {ChatsRepository} from "../domain/repositories/ChatsRepository";
import {LocalStorageAdapter} from "../domain/repositories/LocalStorageAdapter";
import {ChatComposer} from "../components/ChatComposer";
import { io } from "socket.io-client";
import {Settings} from "../components/Settings";

interface Message {
    text: string;
    chatId: string
}

interface Chat {
    id: string;
}

export const ChatScreen = (props:any) => {
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(null)
    const accessToken = LocalStorageAdapter.getAuthData()
    const chatsRepository = new ChatsRepository(accessToken)
    const socketRef = useRef(null)

    const registerListeners = () => {

    }

    // @ts-ignore
    useEffect(() => {

        socketRef.current = io("ws://localhost:3001", {reconnectionDelayMax: 10000,});
        socketRef.current.on('connect', () => {
            console.log('connected')
        })

        return () => socketRef.current.close()
    }, [])




    useEffect(() => {
        if(!socketRef.current){
            return;
        }
        if(socketRef.current.messageListened){
            return;
        }
        socketRef.current.messageListened = true
        console.log("socket change")
        socketRef.current.on('messages', (data: { message: Message, chat: Chat }) => {
            console.log(data);
            console.log(selectedChat)
            if(selectedChat && selectedChat.id === data.message.chatId){
                setMessages([ ...messages, data.message])
                console.log("SET")
            }
            const isChatExists = chats.find(item => item.id === data.chat.id)
            if(!isChatExists) {
                setChats([...chats, data.chat])
            }
        })
        return () => {
            socketRef.current.off('messages')
            socketRef.current.messageListened = false
        }
    }, [selectedChat, messages, chats])

    useEffect(() => {
        if(!accessToken){
            return;
        }
        chatsRepository.getUserChats().then(res => setChats(res));
    }, [])

    useEffect(() => {
        if(selectedChat){
            const accessToken = LocalStorageAdapter.getAuthData()
            if(!accessToken){
                return;
            }
            const chatsRepository = new ChatsRepository(accessToken)
            chatsRepository.getChatMessages(selectedChat.id).then((res) => setMessages(res.reverse()));
        }
    }, [selectedChat])

    return (
        <div className="panel-wrapper">
            <div className="chat-list">
                {chats.map(item => <ChatItem {...item} setSelectedChat={() => setSelectedChat(item)}/>)}
            </div>
            <div style={{
                display:'flex',
                flexDirection: 'column',
                width: '100%'
            }}>
                {selectedChat ? <Chat messages={messages} chatName={selectedChat.chatName}/> : <div style={{width: '100%', height: '90%'}}/>}
                <ChatComposer chatId={selectedChat?.id} chatsRepository={chatsRepository} integrationId={selectedChat?.integrationId}/>
            </div>
            <div className="settings-column">
                <Settings/>
            </div>
        </div>
    )
}
