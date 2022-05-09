import { fetchRequest } from "../../infrastructure/fetchRequest";
import {IntegrationType} from "./UsersRepository";

export class SettingsRepository {

    private readonly accessToken: string;
    private readonly fetchRequest: (path: string, method?: string, headers?: {}, body?: any) => Promise<any>;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
        this.fetchRequest = fetchRequest(accessToken)
    }

    getUserIntegration(){
        return this.fetchRequest('/user-integrations', 'GET', {token: this.accessToken},)
    }

    createIntegration(type: IntegrationType) {
        return this.fetchRequest(
            '/create-integration',
            'POST', {token: this.accessToken}, {type})
    }

    canCommitCreate(integrationId: string) {
        return this.fetchRequest(
            '/can-commit',
            'POST', {token: this.accessToken}, {integrationId})
    }

    pushAuth(integrationId: string, value: string) {
        return this.fetchRequest(
            '/push-auth',
            'POST', {token: this.accessToken}, {integrationId, value})
    }

    commitCreate(integrationId) {
        return this.fetchRequest(
            '/push-auth',
            'POST', {token: this.accessToken}, {integrationId})
    }
}
