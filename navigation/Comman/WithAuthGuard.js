import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const withAuthGuard = (WrappedComponent, redirectTo = "MainNavigator") => {
  return (props) => {
    const isAuth = useSelector((state) => !!state.auth.token);
    const navigation = useNavigation();

    useEffect(() => {
      if (!isAuth) {
        navigation.navigate(redirectTo, {
          redirectTo: props.route?.name, // optional: pass back where to go after auth
        });
      }
    }, [isAuth, navigation]);

    if (!isAuth) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuthGuard;
