const handleBuyNowPress = () => {
  requireAuth(() => {
    bottomSheetRef.current?.expand();
  });
};

// auth check for actions
const requireAuth = (callback) => {
  if (!isAuth) {
    navigation.navigate("AuthScreen", {
      redirectTo: route.name,
      redirectParams: route.params,
    });
  } else {
    callback();
  }
};

// redirect from unauthenticate screen
useEffect(() => {
  if (!isAuth) {
    navigation.replace("AuthScreen");
  }
}, []);

//   product route
const ProtectedRoute = ({ children, navigation }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated); // or context

  useEffect(() => {
    if (!isAuth) {
      navigation.replace("AuthScreen");
    }
  }, [isAuth]);

  if (!isAuth) return null; // or a loading spinner

  return children;
};
const BuyNowScreen = ({ navigation }) => {
  return (
    <ProtectedRoute navigation={navigation}>
      {/* Only rendered if authenticated */}
      <BuyNowComponent />
    </ProtectedRoute>
  );
};

// const handleBuyNowPress = () => {
//   if (!isAuth) {
//     // console.log(route.name);

//     navigation.navigate("AuthScreen", {
//       redirectTo: route.name,
//       redirectParams: route.params, // or any additional params you want to preserve
//     });
//     // console.log(navigation.getParent()?.route?.name);

//     // navigation.navigate("AuthScreen", {
//     //   originatingNavigator: navigation.getParent()?.route?.name,
//     //   // “redirectName” is dynamic – you’re just forwarding whatever screen name you came from
//     //   redirectName: route.name,
//     //   // “redirectKey” gets you the exact instance in the navigator
//     //   redirectParams: route.params,
//     // });
//   } else {
//     bottomSheetRef.current?.expand(); // show the bottom sheet
//   }
// };
