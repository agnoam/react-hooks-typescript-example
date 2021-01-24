import { render, screen } from '@testing-library/react';
import GalleryPage, { getCreds } from './GalleryPage';
import { LocalStorageKeys } from '../../../constants/localStorage.keys';
import { Route, Router, Switch } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Config from '../../../constants/config.json';
import { mockData } from '../../shared/httpService.test';

describe('GalleryPage tests', () => {
    const server = setupServer(
        rest.get(`${Config.serverURL}/sharepoint-search/`, (req, res, ctx) => {
            return res(
                ctx.delay(1500),
                ctx.status(200),
                ctx.json(mockData())
            );
        })
    );

    beforeAll(() => server.listen());

    beforeEach(() => {
        localStorage.setItem(LocalStorageKeys.Credentials, JSON.stringify({ username: 'test', password: 'test' }));
        server.resetHandlers()
    });

    afterAll(() => {
        localStorage.removeItem(LocalStorageKeys.Credentials);
        server.close(); 
    });

    test('Requesting for GalleryPage without credentials', () => {
        // Making sure the credentials are deleted
        localStorage.removeItem(LocalStorageKeys.Credentials);
        
        const history = createMemoryHistory();
        history.push('/gallery');
        render(
            <Router history={history}>
                <Switch>
                    <Route exact path="/gallery" component={GalleryPage} />
                    <Route exact path="/login" component={LoginPage} />
                </Switch>
            </Router>
        );

        expect(history.location.pathname).toEqual('/login');
    });

    test('Getting credentials from localStorage', () => {
        const creds = { username: 'test', password: 'password' }
        localStorage.setItem(LocalStorageKeys.Credentials, JSON.stringify(creds))

        const credentials = getCreds();
        expect(credentials).toEqual(creds);
    });

    // test('Searching text on Enter key', async () => {
    //     const history = createMemoryHistory();
    //     history.push('/gallery');

    //     render(
    //         <Router history={history}>
    //             <Switch>
    //                 <Route exact path="/gallery" component={GalleryPage} />
    //             </Switch>
    //         </Router>
    //     );

    //     const inputContainerElement = await screen.findByTestId('name-searchbox');
    //     const inputElement = inputContainerElement.querySelector('input');
        
    //     if (inputElement?.value)
    //         inputElement.value = 'Test\n';
    //     // userEvent.type(inputElement, 'Test');
    //     // userEvent.type(inputElement, 'Test', { delay: 150 });
    //     // fireEvent.submit(inputElement);

    //     expect(inputElement).toHaveValue('Test')
    //     expect(await screen.findByText('There is nothing to show')).toBeFalsy();
    // });
});