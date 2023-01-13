// Customizable Area Start
import { Route ,Redirect, withRouter } from "react-router-dom";
import { ModalRoute } from "react-router-modal";
import React from "react";
import PropTypes from "prop-types";
import "react-router-modal/css/react-router-modal.css";
import { toast } from "react-toastify";
import "react-router-modal/css/react-router-modal.css";
toast.configure()
function Wrapper({ element, history, match, routeMap, closeModal }) {
  const navigate = (to, params) => {
    let url = routeMap[to].path;
    // replace params ids in the url with actual values
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach(param => {
        const re = RegExp(`\:${param}\\??`); // eslint-disable-line no-useless-escape
        url = url.replace(re, escape(params[param]));
      });
    }
    // removing empty params from url - every string between /: and ?
    url = url.replace(/\/:(.*?)(?=\/|$)/g, "");
    // if the route is not a modal
    if (!routeMap[to].modal) {
      history.push(url);
      // if the route is a modal
    } else {
      // checking if the url ends with a slash or not
      const slash = /\/$/.test(match.url) ? "" : "/";
      // current url in the browser + slash + modal url with parameters
      url = match.url + slash + url;
      // removing the */ from the url
      url = url.replace(/\*\/?/g, "");
      history.push(url);
    }
  };

  const getParam = (param, alternative) => {
    return match.params[param] || alternative;
  };

  const goBack = () => {
    history.goBack();
  };

  return React.cloneElement(element, {
    navigation: { navigate, getParam, goBack },
    closeModal
  });
}

Wrapper.propTypes = {
  element: PropTypes.element,
  history: PropTypes.object,
  routeMap: PropTypes.object,
  closeModal: PropTypes.func,
  match: PropTypes.object
};

const PrivateRoute = withRouter((props) => {
  const { children, allowedRoute } = props;
  console.log(props,"PRops")
  const userRole = localStorage.getItem("user_type") || "";

  if (allowedRoute?.includes("public") ) {
    return children

  }
   else if(allowedRoute?.includes(userRole) ){
    return children;
  }
  // else if (allowedRoute !== userRole) {
  //   toast.error("You are not authorised to access this page..!", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: 6000,
  //   });
  //   return <Redirect to="/EmailAccountLoginsBlock" />;
  // }
  // else if (
  //   !userRole &&
  //   (allowedRoute === "Superadmin" || allowedRoute === "Admin" || allowedRoute==="Designer/QC/QA"||allowedRoute==="TL/Manager")
  // ) {
  //   api();
  //   toast.error("You are not authorised to access this page..!", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: 6000,
  //   });
  //   return <Redirect to="/EmailAccountLoginsBlock" />;
  // }
  else {
    return <Redirect to="/EmailAccountLoginsBlock" />;
  }
});

const WebRoutesGenerator = ({ routeMap }) => {
  return Object.keys(routeMap).map(route => {
    const currentRoute = routeMap[route];
    const Component = currentRoute.component;
    if (currentRoute.modal) {
      return (
        <ModalRoute
          key={currentRoute.path}
          path={currentRoute.path}
          component={props => (
            <Wrapper element={<Component />} {...props} routeMap={routeMap} />
          )}
        />
      );
    } else {
      return (
        <Route
          key={currentRoute.path}
          path={currentRoute.path}
          exact={currentRoute.exact}
          render={props => (
            <Wrapper
            element={
              <PrivateRoute
              allowedRoute={currentRoute.user_type}
              >
                <Component {...props} />
              </PrivateRoute>
            }
            {...props}
            routeMap={routeMap}
          />
        )}

        />
      );
    }
  });
};

WebRoutesGenerator.propTypes = {
  routeMap: PropTypes.object
};

export default WebRoutesGenerator;
// Customizable Area End