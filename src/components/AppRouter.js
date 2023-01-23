import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Context } from '..';
import Auth from '../pages/Auth';
import { authRoutes, publicRoutes } from '../routes';

const AppRouter = observer(() => {
  const { userStore } = useContext(Context);

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} exact />
      ))}
      {userStore.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} exact />
        ))}
      <Route path={'*'} element={<Auth />} />
    </Routes>
  );
});

export default AppRouter;
