import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'; 
import GalleryPage from './GalleryPage/GalleryPage';
import LoginPage from './LoginPage/LoginPage';

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route path="/gallery" component={GalleryPage} />
            </Switch>
        </Router>
    );
}