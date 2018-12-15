import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import { _route } from '../../utils/Navigation';

const Navigator = props => {
    const { authenticated, routes } = props.pageProps;

    return (
        <Switch>
            {routes.map((route, i) => {
                const View = route.component;

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact
                        render={routeProps => {
                            if (route.auth) {
                                if (!authenticated) {
                                    return (
                                        <Redirect
                                            to={_route(
                                                'backoffice.auth.signin',
                                            )}
                                        />
                                    );
                                }
                            }

                            if (!route.auth) {
                                if (authenticated) {
                                    return (
                                        <Redirect
                                            to={_route('backoffice.dashboard')}
                                        />
                                    );
                                }
                            }

                            return <View {...props} {...routeProps} />;
                        }}
                    />
                );
            })}
        </Switch>
    );
};

Navigator.propTypes = {
    pageProps: PropTypes.object,
};

export default withRouter(Navigator);
