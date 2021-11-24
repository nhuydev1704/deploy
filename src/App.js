import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
// import PageRender from './customRouter/PageRender';
// import PrivateRouter from './customRouter/PrivateRouter';
import Home from './pages/home';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSocketGlobal } from './redux/actions/socketAction';
import moment from 'moment';
import 'moment/locale/vi';
import { API_URL } from './apis/fetchData';

moment.locale('vi');

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io(`${API_URL}`);
        dispatch(setSocketGlobal(socket));
        return () => socket.close();
    }, [dispatch]);

    return (
        <Router>
            <div className="App">
                <div className="main">
                    {/* <Route exact path="/" component={auth.token ? Home : Login} /> */}
                    {/* <Route exact path="/" component={Home} /> */}
                    {/* <Route exact path="/register" component={Register} /> */}

                    {/* <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} /> */}
                    <Home />
                </div>
            </div>
        </Router>
    );
}

export default App;
