import SingleSignOnRegistry from '../../src/sso/SingleSignOnRegistry';
import SSOToken from '../../src/sso/SSOToken';

export class SingleSignOnRegistryFake implements SingleSignOnRegistry {
    private validCredentials = [
        {username: 'valid_user', password: 'password'},
        {username: 'valid_user1', password: 'password'},
    ];

    isValid(token: string): boolean {
        throw new Error('Dummy: not implemented');
    }

    registerNewSession(userName: string, password: string): SSOToken | undefined {
        if (this.validCredentials.some(
            credential => credential.username === userName && credential.password === password)) {
            return new SSOToken(`${userName}_token`);
        } else {
            return undefined;
        }
    }

    unregister(token: string): void {
        throw new Error('Dummy: not implemented');
    }
}
