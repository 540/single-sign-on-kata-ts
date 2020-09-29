import MyService from '../src/myservice/MyService';
import Request from '../src/sso/Request';
import SSOToken from '../src/sso/SSOToken';
import { SingleSignOnRegistryDummy } from './__mocks__/SingleSignOnRegistryDummy';
import { SingleSignOnRegistryValidStub } from './__mocks__/SingleSignOnRegistryValidStub';
import { SingleSignOnRegistryInvalidStub } from './__mocks__/SingleSignOnRegistryInvalidStub';
import { SingleSignOnRegistryStub } from './__mocks__/SingleSignOnRegistryStub';
import { SingleSignOnRegistryFake } from './__mocks__/SingleSignOnRegistryFake';
import { SingleSignOnRegistrySpy } from './__mocks__/SingleSignOnRegistrySpy';

describe('MyService', () => {
    it('sso token dummy', () => {
        const service = new MyService(new SingleSignOnRegistryDummy());

        expect(() => service.handleRequest(new Request('Foo', new SSOToken('token')))).toThrowError();
    });

    describe('specific stub', () => {
        it('returns name for valid sso token', () => {
            const service = new MyService(new SingleSignOnRegistryValidStub());

            const response = service.handleRequest(new Request('Foo', new SSOToken('token')));

            expect(response.getText()).toEqual('hello Foo!');
        });

        it('returns none for empty sso token', () => {
            const service = new MyService(new SingleSignOnRegistryInvalidStub());

            const response = service.handleRequest(new Request('Foo', new SSOToken('token')));

            expect(response.getText()).not.toEqual('hello Foo!');
        });
    });

    describe('generic stub', () => {
        let registry!: SingleSignOnRegistryStub;
        let service!: MyService;

        beforeEach(() => {
            registry = new SingleSignOnRegistryStub();
            service = new MyService(registry);
        });

        it('returns name for valid sso token', () => {
            registry.setIsValidToReturnValid();

            const response = service.handleRequest(new Request('Foo', new SSOToken('token')));

            expect(response.getText()).toEqual('hello Foo!');
        });

        it('returns none for empty sso token', () => {
            registry.setIsValidToReturnInvalid();

            const response = service.handleRequest(new Request('Foo', new SSOToken('token')));

            expect(response.getText()).not.toEqual('hello Foo!');
        });
    });

    describe('fake', () => {
        it('returns token for valid user credentials', () => {
            const service = new MyService(new SingleSignOnRegistryFake());

            const response = service.handleRegister('valid_user', 'password');

            expect(response).toEqual(new SSOToken('valid_user_token'));
        });

        it('returns token for another valid user credentials', () => {
            const service = new MyService(new SingleSignOnRegistryFake());

            const response = service.handleRegister('valid_user1', 'password');

            expect(response).toEqual(new SSOToken('valid_user1_token'));
        });

        it('returns none for invalid user credentials', () => {
            const service = new MyService(new SingleSignOnRegistryFake());

            const response = service.handleRegister('invalid_user', 'password');

            expect(response).toBeUndefined()
        });
    })

    describe('spy', () => {
        it('unregisters token', () => {
            const singleSignOnRegistrySpy = new SingleSignOnRegistrySpy();
            const service = new MyService(singleSignOnRegistrySpy);

            service.handleUnRegister(new SSOToken('valid'));

            expect(singleSignOnRegistrySpy.didCallUnregister()).toBeTruthy()
        })

        it('unregisters specific token', () => {
            const singleSignOnRegistrySpy = new SingleSignOnRegistrySpy();
            const service = new MyService(singleSignOnRegistrySpy);

            service.handleUnRegister(new SSOToken('valid'));

            expect(singleSignOnRegistrySpy.didCallUnregisterWithToken()).toEqual('valid')
        })
    })
});
