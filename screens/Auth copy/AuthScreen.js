// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import PageContainer from "../components/PageContainer";
// import SignInForm from "../components/SignInForm";
// import SignUpForm from "../components/SignUpForm";
// import colors from "../constants/colors";

// import logo from "../assets/images/logo.jpg";

// const AuthScreen = (props) => {
//   const [isSignUp, setIsSignUp] = useState(false);

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <PageContainer>
//         <ScrollView>
//             <View style={styles.imageContainer}>
//               <Image style={styles.image} source={logo} resizeMode="contain" />
//             </View>
//             <KeyboardAvoidingView
//               style={styles.keyboardAvoidingView}
//               behavior={Platform.OS === "ios" ? "height" : undefined}
//               keyboardVerticalOffset={100}
//             >

//               {isSignUp ? <SignUpForm /> : <SignInForm />}

//               <TouchableOpacity
//                 onPress={() => setIsSignUp((prevState) => !prevState)}
//                 style={styles.linkContainer}
//               >
//                 <Text style={styles.link}>{`Switch to ${
//                   isSignUp ? "sign in" : "sign up"
//                 }`}</Text>
//               </TouchableOpacity>
//             </KeyboardAvoidingView>
//         </ScrollView>
//       </PageContainer>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   linkContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 15,
//   },
//   link: {
//     color: colors.blue,
//     fontFamily: "medium",
//     letterSpacing: 0.3,
//   },
//   imageContainer: {

//     height:300,
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical:30,
//   },
//   image: {
//     flex:1,
//     borderRadius:50

//   },
//   keyboardAvoidingView: {
//     flex: 1,
//     justifyContent: "center",
//   },
// });

// export default AuthScreen;

import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageContainer from "../../components/PageContainer";
import SignInForm from "../../components/SignInForm";
import SignUpForm from "../../components/SignUpForm";
import colors from "../../constants/colors";

import logo from "./../../assets/images/logo.jpg";
import { useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";

// Memoize the AuthScreen component to avoid unnecessary re-renders
const AuthScreen = React.memo((props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { redirectTo, redirectParams } = props.route.params || {};

  const toggleAuthMode = useCallback(() => {
    setIsSignUp((prevState) => !prevState);
  }, []);

  const isAuth = useSelector(
    (state) => state.auth.token !== null && state.auth.token !== ""
  );

  console.log(props.route);
  useEffect(() => {
    if (isAuth) {
      // if (redirectTo && redirectParams) {
      // props.navigation.reset({
      //   index: 1,
      //   routes: [
      //     {
      //       name: redirectTo,
      //       params: {
      //         screen: redirectParams.screen,
      //         params: redirectParams.params,
      //       },
      //     },
      //   ],
      // });
      props.navigation.goBack();
      // } else {
      // props.navigation.replace("MainNavigator");
      // }
    }
  }, [isAuth]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={logo} resizeMode="contain" />
          </View>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={100}
          >
            {isSignUp ? <SignUpForm /> : <SignInForm />}

            <TouchableOpacity
              onPress={toggleAuthMode}
              style={styles.linkContainer}
            >
              <Text style={styles.link}>
                {`Switch to ${isSignUp ? "sign in" : "sign up"}`}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  link: {
    color: colors.blue,
    fontFamily: "medium",
    letterSpacing: 0.3,
  },
  imageContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  image: {
    flex: 1,
    borderRadius: 50,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
});

export default AuthScreen;
