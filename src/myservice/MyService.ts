import Response from '../sso/Response'
import Request from '../sso/Request'
import SingleSignOnRegistry from '../sso/SingleSignOnRegistry'
import SSOToken from '../sso/SSOToken'

export default class MyService {
  private readonly registry: SingleSignOnRegistry

  constructor(registry: SingleSignOnRegistry) {
    this.registry = registry
  }

  handleRequest(request: Request): Response {
    if(this.registry.isValid(request.getSSOToken().getToken())) {
      return new Response(`hello ${request.getName()}!`)
    } else {
      return new Response('')
    }
  }

  handleRegister(username: string, password: string): SSOToken | undefined {
    return this.registry.registerNewSession(username, password)
  }

  handleUnRegister(token: SSOToken) {
    this.registry.unregister(token.getToken())
  }
}
