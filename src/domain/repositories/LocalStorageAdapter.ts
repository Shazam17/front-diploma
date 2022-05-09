export class LocalStorageAdapter {

  static ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY'
  static REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_KEY'

  constructor() {
  }

  static getAuthData(){
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  static saveAuthData(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken)
  }

}
