import Auth from './pages/Auth';
import Monitoring from './pages/Monitoring';
import MonitoringDialogs from './pages/MonitoringDialogs';
import MonitoringRequests from './pages/MonitoringRequests';
import {
  LOGIN_ROUTE, MONITORING_DIALOGS, MONITORING_REQUESTS, MONITORING_ROUTE, REGISTRATION_ROUTE
} from './utils/consts';

export const authRoutes = [
  {
    path: MONITORING_ROUTE,
    Component: <Monitoring />,
  },
  {
    path: MONITORING_REQUESTS,
    Component: <MonitoringRequests />,
  },
  {
    path: MONITORING_DIALOGS,
    Component: <MonitoringDialogs />,
  }
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Auth />,
  },
];
