export const Message = (props: any) => {
    return (
        <div className="message-bubble">
            <div>{props.text}</div>
            <div>{props.createdAt}</div>
        </div>

    );
}
