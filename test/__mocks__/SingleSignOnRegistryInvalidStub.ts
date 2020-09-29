import SingleSignOnRegistry from '../../src/sso/SingleSignOnRegistry';
import SSOToken from '../../src/sso/SSOToken';

export class SingleSignOnRegistryInvalidStub implements SingleSignOnRegistry {
    isValid(token: string): boolean {
        return false
    }

    registerNewSession(userName: string, password: string): SSOToken | undefined {
        throw new Error('Dummy: not implemented');
    }

    unregister(token: string): void {
        throw new Error('Dummy: not implemented');
    }
}
