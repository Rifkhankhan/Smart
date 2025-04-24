// import React from "react";

// import { useDispatch, useSelector } from "react-redux";

// import { AdminNavigator } from "./Admin/AdminNavigators";
// import { SellerNavigators } from "./Client/ClientNavigators";
// import { CustomerNavigators } from "./Customer/CustomerNavigator";

// import { KeyboardAvoidingView, Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // AsyncStorage.clear();

// const MainNavigator = (props) => {
//   const { authData } = useSelector((state) => state.auth);

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       {authData?.role === "admin" && <AdminNavigator />}
//       {authData?.role === "shop" && <SellerNavigators />}
//       {authData?.role === "customer" && <CustomerNavigators />}
//     </KeyboardAvoidingView>
//   );
// };

// export default MainNavigator;


import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { KeyboardAvoidingView, Platform } from "react-native";

// Import the navigation components
import { AdminNavigator } from "./Admin/AdminNavigators";
import { SellerNavigators } from "./Client/ClientNavigators";
import { CustomerNavigators } from "./Customer/CustomerNavigator";

// Memoize the navigation components to prevent unnecessary re-renders
const MemoizedAdminNavigator = React.memo(AdminNavigator);
const MemoizedSellerNavigators = React.memo(SellerNavigators);
const MemoizedCustomerNavigators = React.memo(CustomerNavigators);

const MainNavigator = (props) => {
  const { authData } = useSelector((state) => state.auth);

  // Use useMemo to prevent unnecessary re-renders of the navigation components
  const navigatorToRender = useMemo(() => {
    if (authData?.role === "admin") {
      return <MemoizedAdminNavigator />;
    } else if (authData?.role === "shop") {
      return <MemoizedSellerNavigators />;
    } else if (authData?.role === "customer") {
      return <MemoizedCustomerNavigators />;
    }
    return null;
  }, [authData?.role]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {navigatorToRender}
    </KeyboardAvoidingView>
  );
};

export default MainNavigator;
