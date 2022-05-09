import {fetchRequest} from "../../infrastructure/fetchRequest";

export enum IntegrationType {
  TELEGRAM= 'TELEGRAM'
}

export class UsersRepository {


  private readonly fetchRequest: (path: string, method?: string, headers?: {}, body?: any) => Promise<object>;

  constructor() {
    this.fetchRequest = fetchRequest(null);
  }

  signIn(email: string, password: string){
    return this.fetchRequest('/login', 'POST', {}, { email, password})
  }

  signUp(username: string, email: string, password: string){
    return this.fetchRequest('/login', 'POST', {}, { email, password, username})
  }

}
