import SingleSignOnRegistry from '../../src/sso/SingleSignOnRegistry';
import SSOToken from '../../src/sso/SSOToken';

export class SingleSignOnRegistrySpy implements SingleSignOnRegistry {
    private didUnregister: boolean;
    private unregisteredToken: string | undefined;

    isValid(token: string): boolean {
        throw new Error('Dummy: not implemented');
    }

    registerNewSession(userName: string, password: string): SSOToken | undefined {
        throw new Error('Dummy: not implemented');
    }

    unregister(token: string): void {
        this.didUnregister = true;
        this.unregisteredToken = token;
    }

    didCallUnregister() {
        return this.didUnregister;
    }

    didCallUnregisterWithToken() {
        return this.unregisteredToken;
    }
}
