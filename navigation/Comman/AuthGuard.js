// components/Auth/AuthGuard.js
import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux"; // or your auth context/store
import { useEffect } from "react";

const AuthGuard = (WrappedComponent) => {
  return (props) => {
    const isAuth = useSelector(
      (state) => state.auth.token !== null && state.auth.token !== ""
    );
    const navigation = useNavigation();

    if (!isAuth) {
      navigation.navigate("AuthStack", {
        screen: "AuthScreen",
        params: {
          redirectTo: props.route.name,
          redirectParams: props.route.params,
        },
      });
    }

    return <WrappedComponent {...props} />;
  };
};

export default AuthGuard;
