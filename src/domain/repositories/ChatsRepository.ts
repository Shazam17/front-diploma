import {fetchRequest} from "../../infrastructure/fetchRequest";

export class ChatsRepository {
    private accessToken: string;
    private readonly fetchRequest: (path: string, method?: string, headers?: {}, body?: any) => Promise<any>;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
        this.fetchRequest = fetchRequest(accessToken)
    }

    getChatMessages(chatId: string, offset = 0, limit = 100) {
        return this.fetchRequest(
            `/chat-history/${chatId}?channelType=ALL&offset=${offset}&limit=${limit}`,
            'GET', {token: this.accessToken}).then((res => {console.log(res); return res;}))
    }

    getUserChats(){
        return this.fetchRequest('/user-chats?channelType=ALL&offset=0&limit=10', 'GET', {token: this.accessToken}).then((res => {console.log(res); return res;}))
    }

    sendMessages(chatId: string, message: string, integrationId: string) {
        return this.fetchRequest('/send-message', 'POST', {token: this.accessToken}, {chatId, message, integrationId})
    }
}
