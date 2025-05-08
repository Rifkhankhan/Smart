import React, { useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ProtectedScreenWrapper = ({
  children,
  fallbackScreen = "AuthStack",
  routeName,
}) => {
  const isFocused = useIsFocused();
  const isAuth = useSelector((state) => !!state.auth.token);
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused && !isAuth) {
      // Go to AuthStack with a redirect param
      navigation.navigate(fallbackScreen, {
        redirectTo: routeName,
      });
    }
  }, [isFocused, isAuth]);

  // Don't render protected content if not authenticated
  if (!isAuth) return null;
  return children;
};

export default ProtectedScreenWrapper;
