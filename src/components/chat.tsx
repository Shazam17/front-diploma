import {Message} from "./Message";
import {useEffect, useRef} from "react";

export const Chat = (props: any) => {
    const divRef = useRef(null);
    const scrollToBottom = () => {
        // divRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [props.messages]);


    return (
        <div className="chat-wrapper">
            <div className="chat-header">
                {props.chatName}
            </div>
            <div className="message-container">
                {props.messages.map((item) => <Message {...item} />) }
                <div  ref={divRef}/>
            </ div >
        </div>
);
}
