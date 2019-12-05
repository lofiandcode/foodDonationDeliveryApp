import React from 'react';
import { Redirect } from "react-router-dom";
const LoggedInHOC = (TrueComponent)=> {
   return class LoggedInHOC extends React.Component {
       render() {
           return this.props.loggedIn?<TrueComponent {...this.props} />: <Redirect to="/login"/>
       }
   }
}
export default LoggedInHOC;