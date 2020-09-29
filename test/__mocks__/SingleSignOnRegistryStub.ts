import SingleSignOnRegistry from '../../src/sso/SingleSignOnRegistry';
import SSOToken from '../../src/sso/SSOToken';

export class SingleSignOnRegistryStub implements SingleSignOnRegistry {
    private isValidResult: boolean;

    isValid(token: string): boolean {
        return this.isValidResult;
    }

    registerNewSession(userName: string, password: string): SSOToken | undefined {
        throw new Error('Dummy: not implemented');
    }

    unregister(token: string): void {
        throw new Error('Dummy: not implemented');
    }

    setIsValidToReturnValid() {
        this.isValidResult = true;
    }

    setIsValidToReturnInvalid() {
        this.isValidResult = false;
    }
}
