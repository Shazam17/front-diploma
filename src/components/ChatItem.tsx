
export const ChatItem = (props: any) => {
    return (
        <div className="chat-item" onClick={() => {
            props.setSelectedChat()
        }}>
            <div className="chat-name">{props.chatName}</div>
            <div className="chat-name">{props.type}</div>
            {/*<div className="chat-last-message">{props}</div>*/}
        </div>
    )
}
