import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route, } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import LoadingScreen from 'src/components/LoadingScreen';

type Routes = {
  id?: number;
  exact?: boolean;
  path?: string | string[];
  layout?: any;
  component?: any;
  routes?: Routes;
}[];

export const renderRoutes = (routes: Routes = []): JSX.Element => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={route.id}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Layout>
                {route.routes
                  ? renderRoutes(route.routes)
                  : <Component {...props} />}
              </Layout>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes: Routes = [
  {
    id: 1,
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/NotFoundView')),
  },
  {
    id: 2,
    path: '*',
    layout: DashboardLayout,
    routes: [
      {
        id: 3,
        exact: true,
        path: '/',
        component: () => <Redirect to="/app" />,
      },
      {
        id: 4,
        exact: true,
        path: '/app/members',
        component: lazy(() => import('src/views/members/List')),
      },
      {
        id: 5,
        exact: true,
        path: '/app/members/add',
        component: lazy(() => import('src/views/members/Add')),
      },
      {
        id: 6,
        exact: true,
        path: '/app/members/:id',
        component: lazy(() => import('src/views/members/Edit')),
      },{
        id: 7,
        exact: true,
        path: '/app/sports',
        component: lazy(() => import('src/views/sports/List')),
      },
      {
        id: 8,
        exact: true,
        path: '/app/sports/add',
        component: lazy(() => import('src/views/sports/Add')),
      },
      {
        id: 10,
        exact: true,
        path: '/app/sports/:id',
        component: lazy(() => import('src/views/sports/Edit')),
      },
      {
        id: 11,
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/members" />
      },
      {
        id: 12,
        component: () => <Redirect to="/404" />,
      },
    ],
  }
];

export default routes;
