import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Config from '../../constants/config.json';
import { verifyCredentials } from './httpService';

export const mockData = () => {
    return [{
        src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        width: 1920,
        height: 1080
    },
    {
        src: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
        width: 1920,
        height: 1080
    },
    {
        src: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
        width: 1920,
        height: 1080
    }];
}

describe('Http service tests', () => {
    const server = setupServer(
        rest.get(`${Config.serverURL}/sharepoint-search/`, (req, res, ctx) => {
            return res(
                // ctx.delay(1500),
                ctx.status(200),
                ctx.json(mockData())
            );
        }),
        rest.post(`${Config.serverURL}/api/ver-login/`, (req, res, ctx) => {
            const { username, password } = req.body as any;

            return res(
                ctx.status(200),
                ctx.json({ success: username === 'test' && password === 'test' })
            );
        })
    );

    beforeAll(() => server.listen());

    beforeEach(() => server.resetHandlers());

    afterAll(() => server.close());

    describe('Verify credentials test suite', () => {
        // The correct credentials for this request at testing is 'test' for the username and 'test' for the password

        test('Verifying correct credentials', async () => {
            const isVerified: boolean = await verifyCredentials({ username: 'test', password: 'test' });
            expect(isVerified).toEqual(true);
        });
    
        test('Verifiyng falsy username', async () => {
            const isVerified: boolean = await verifyCredentials({ username: 'falsyUsername', password: 'test' });
            expect(isVerified).toEqual(false);
        });
    
        test('Verifiyng falsy password', async () => {
            const isVerified: boolean = await verifyCredentials({ username: 'test', password: 'falsyPassword' });
            expect(isVerified).toEqual(false);
        });

        test('Verifiyng falsy username and password', async () => {
            const isVerified: boolean = await verifyCredentials({ username: 'falsyUsername', password: 'falsyPassword' });
            expect(isVerified).toEqual(false);
        });
    });
});

export {};