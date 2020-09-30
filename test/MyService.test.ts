import MyService from '../src/myservice/MyService';
import Request from '../src/sso/Request';
import SSOToken from '../src/sso/SSOToken';
import { TestSingleSignOnRegistry } from './__mocks__/TestSingleSignOnRegistry';
import SingleSignOnRegistry from '../src/sso/SingleSignOnRegistry';
import { mock } from 'jest-mock-extended';
import { MockProxy } from 'jest-mock-extended/lib/Mock';
import Mock = jest.Mock;

describe('MyService', () => {
    it('sso token dummy', () => {
        const service = new MyService(new TestSingleSignOnRegistry());

        expect(() => service.handleRequest(new Request('Foo', new SSOToken('token')))).toThrowError();
    });

    describe('spy on', () => {
        let registry!: TestSingleSignOnRegistry;
        let service!: MyService;

        beforeEach(() => {
            registry = new TestSingleSignOnRegistry();
            service = new MyService(registry);
        });

        it('returns name for valid sso token', () => {
            jest.spyOn(registry, 'isValid').mockReturnValue(true);

            const response = service.handleRequest(new Request('Foo', new SSOToken('token')));

            expect(response.getText()).toEqual('hello Foo!');
        });

        it('returns none for empty sso token', () => {
            jest.spyOn(registry, 'isValid').mockReturnValue(false);

            const response = service.handleRequest(new Request('Foo', new SSOToken('token')));

            expect(response.getText()).not.toEqual('hello Foo!');
        });
    });

    describe('jest fn', () => {
        let registry!: SingleSignOnRegistryFn;
        let service!: MyService;

        beforeEach(() => {
            registry = {
                registerNewSession: jest.fn(),
                isValid: jest.fn(),
                unregister: jest.fn(),
            };
            service = new MyService(registry);
        });

        it('returns name for valid sso token', () => {
            registry.isValid.mockReturnValue(true);

            const response = service.handleRequest(new Request('Foo', new SSOToken('token')));

            expect(response.getText()).toEqual('hello Foo!');
        });

        it('returns none for empty sso token', () => {
            registry.isValid.mockReturnValue(false);

            const response = service.handleRequest(new Request('Foo', new SSOToken('token')));

            expect(response.getText()).not.toEqual('hello Foo!');
        });
    });

    describe('jest mock extended', () => {
        let registry!: MockProxy<SingleSignOnRegistry>;
        let service!: MyService;

        beforeEach(() => {
            registry = mock<SingleSignOnRegistry>();
            service = new MyService(registry);
        });

        it('returns token for valid user credentials', () => {
            registry.registerNewSession.mockReturnValue(new SSOToken('valid_user_token'));

            const response = service.handleRegister('valid_user', 'password');

            expect(response).toEqual(new SSOToken('valid_user_token'));
        });

        it('returns none for invalid user credentials', () => {
            registry.registerNewSession.mockReturnValue(undefined);

            const response = service.handleRegister('invalid_user', 'password');

            expect(response).toBeUndefined();
        });
    });

    describe('jest mock extended -> spy', () => {
        let registry!: MockProxy<SingleSignOnRegistry>;
        let service!: MyService;

        beforeEach(() => {
            registry = mock<SingleSignOnRegistry>();
            service = new MyService(registry);
        });

        it('unregisters token', () => {
            service.handleUnRegister(new SSOToken('valid'));

            expect(registry.unregister).toHaveBeenCalled();
        });

        it('unregisters specific token', () => {
            service.handleUnRegister(new SSOToken('valid'));

            expect(registry.unregister).toHaveBeenCalledWith('valid');
        });
    });
});

interface SingleSignOnRegistryFn extends SingleSignOnRegistry {
    registerNewSession: Mock<SSOToken>,
    isValid: Mock<boolean>,
    unregister: Mock
}
