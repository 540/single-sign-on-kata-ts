import SingleSignOnRegistry from '../../src/sso/SingleSignOnRegistry';
import SSOToken from '../../src/sso/SSOToken';

export class TestSingleSignOnRegistry implements SingleSignOnRegistry {
    isValid(token: string): boolean {
        throw new Error('Dummy: not implemented');
    }

    registerNewSession(userName: string, password: string): SSOToken | undefined {
        throw new Error('Dummy: not implemented');
    }

    unregister(token: string): void {
        throw new Error('Dummy: not implemented');
    }
}
