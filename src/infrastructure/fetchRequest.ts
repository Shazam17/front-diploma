
const url = 'http://localhost:3001'

export const fetchRequest = (token: string | null) => (path: string,method = 'POST', headers = {}, body = null ) => {
  let requestBody = {}
  if(body){
    requestBody = {body: JSON.stringify(body)}
  }
  let tokenHeader = {}
  if(token){
    tokenHeader = {token}
  }
  return fetch(url + path, {
    headers: {
      ...headers,
        ...tokenHeader,
      'Content-Type': 'application/json'
    },
    method,
    ...requestBody
  }).then(res => res.json())
}
