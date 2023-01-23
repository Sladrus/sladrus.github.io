import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import MonitorNav from './components/MonitorNav';
import NavBar from './components/NavBar';

const App = observer(() => {
  const { userStore } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth();
    } else {
      userStore.setIsLoading(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <MonitorNav />
      {userStore.isLoading ? (
        <center>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </center>
      ) : (
        <AppRouter />
      )}
    </BrowserRouter>
  );
});

export default App;
