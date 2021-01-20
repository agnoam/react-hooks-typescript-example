import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'; 
import GalleryPage from './GalleryPage/GalleryPage';
import LoginPage from './LoginPage/LoginPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/gallery" component={GalleryPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    );
}