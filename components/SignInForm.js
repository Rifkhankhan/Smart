// import React, { useCallback, useEffect, useReducer, useState } from 'react'
// import Input from '../components/Input'
// import SubmitButton from '../components/SubmitButton'
// import { Feather } from '@expo/vector-icons'

// import { validateInput } from '../utils/actions/formActions'
// import { reducer } from '../utils/reducers/formReducer'
// import { signIn } from '../utils/actions/authActions'
// import { ActivityIndicator, Alert } from 'react-native'
// import { useDispatch } from 'react-redux'
// import colors from '../constants/colors'

// const isTestMode = true

// const initialState = {
// 	inputValues: {
// 		email: isTestMode ? 'kather@gmail.com' : '',
// 		password: isTestMode ? '123456' : ''
// 	},
// 	inputValidities: {
// 		email: isTestMode,
// 		password: isTestMode
// 	},
// 	formIsValid: isTestMode
// }

// const SignInForm = props => {
// 	const dispatch = useDispatch()

// 	const [error, setError] = useState()
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [formState, dispatchFormState] = useReducer(reducer, initialState)

// 	const inputChangedHandler = useCallback(
// 		(inputId, inputValue) => {
// 			const result = validateInput(inputId, inputValue)
// 			dispatchFormState({ inputId, validationResult: result, inputValue })
// 		},
// 		[dispatchFormState]
// 	)

// 	useEffect(() => {
// 		if (error) {
// 			Alert.alert('An error occured', error, [{ text: 'Okay' }])
// 		}
// 	}, [error])

// 	const authHandler = useCallback(async () => {
// 		try {
// 			setIsLoading(true)

// 			const action = signIn(
// 				formState.inputValues.email,
// 				formState.inputValues.password
// 			)
// 			setError(null)
// 			await dispatch(action)
// 		} catch (error) {
// 			setError(error.message)
// 			setIsLoading(false)
// 		}
// 	}, [dispatch, formState])

// 	return (
// 		<>
// 			<Input
// 				id="email"
// 				label="Email"
// 				icon="mail"
// 				iconPack={Feather}
// 				autoCapitalize="none"
// 				keyboardType="email-address"
// 				onInputChanged={inputChangedHandler}
// 				initialValue={formState.inputValues.email}
// 				errorText={formState.inputValidities['email']}
// 			/>

// 			<Input
// 				id="password"
// 				label="Password"
// 				icon="lock"
// 				iconPack={Feather}
// 				autoCapitalize="none"
// 				secureTextEntry
// 				onInputChanged={inputChangedHandler}
// 				initialValue={formState.inputValues.password}
// 				errorText={formState.inputValidities['password']}
// 			/>

// 			{isLoading ? (
// 				<ActivityIndicator
// 					size={'small'}
// 					color={colors.primary}
// 					style={{ marginTop: 10 }}
// 				/>
// 			) : (
// 				<SubmitButton
// 					title="Sign in"
// 					onPress={authHandler}
// 					style={{ marginTop: 20 }}
// 					disabled={!formState.formIsValid}
// 				/>
// 			)}
// 		</>
// 	)
// }

// export default SignInForm

import React, { useCallback, useEffect, useReducer, useState } from "react";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { Feather } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { signIn } from "../utils/actions/authActions";
import { ActivityIndicator, Alert } from "react-native";
import { useDispatch } from "react-redux";
import colors from "../constants/colors";

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? "customer@gmail.com" : "",
    password: isTestMode ? "123456" : "",
  },
  inputValidities: {
    email: isTestMode,
    password: isTestMode,
  },
  formIsValid: isTestMode,
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const action = signIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
      await dispatch(action);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, formState.inputValues]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <>
      <Input
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        autoCapitalize="none"
        keyboardType="email-address"
        onInputChanged={inputChangedHandler}
        initialValue={formState.inputValues.email}
        errorText={formState.inputValidities["email"]}
      />

      <Input
        id="password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        autoCapitalize="none"
        secureTextEntry
        onInputChanged={inputChangedHandler}
        initialValue={formState.inputValues.password}
        errorText={formState.inputValidities["password"]}
      />

      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          title="Sign in"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignInForm;
