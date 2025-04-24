// import React, { useCallback, useEffect, useReducer, useState } from 'react'
// import Input from '../components/Input'
// import SubmitButton from '../components/SubmitButton'
// import { Feather, FontAwesome } from '@expo/vector-icons'

// import { validateInput } from '../utils/actions/formActions'
// import { reducer } from '../utils/reducers/formReducer'
// import { signUp } from '../utils/actions/authActions'
// import { ActivityIndicator, Alert } from 'react-native'
// import colors from '../constants/colors'
// import { useDispatch, useSelector } from 'react-redux'

// const initialState = {
// 	inputValues: {
// 		firstName: '',
// 		lastName: '',
// 		email: '',
// 		password: ''
// 	},
// 	inputValidities: {
// 		firstName: false,
// 		lastName: false,
// 		email: false,
// 		password: false
// 	},
// 	formIsValid: false
// }

// const SignUpForm = props => {
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

// 			const action = signUp(
// 				formState.inputValues.firstName,
// 				formState.inputValues.lastName,
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
// 				id="firstName"
// 				label="First name"
// 				icon="user-o"
// 				iconPack={FontAwesome}
// 				onInputChanged={inputChangedHandler}
// 				autoCapitalize="none"
// 				errorText={formState.inputValidities['firstName']}
// 			/>

// 			<Input
// 				id="lastName"
// 				label="Last name"
// 				icon="user-o"
// 				iconPack={FontAwesome}
// 				onInputChanged={inputChangedHandler}
// 				autoCapitalize="none"
// 				errorText={formState.inputValidities['lastName']}
// 			/>

// 			<Input
// 				id="email"
// 				label="Email"
// 				icon="mail"
// 				iconPack={Feather}
// 				onInputChanged={inputChangedHandler}
// 				keyboardType="email-address"
// 				autoCapitalize="none"
// 				errorText={formState.inputValidities['email']}
// 			/>

// 			<Input
// 				id="password"
// 				label="Password"
// 				icon="lock"
// 				autoCapitalize="none"
// 				secureTextEntry
// 				iconPack={Feather}
// 				onInputChanged={inputChangedHandler}
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
// 					title="Sign up"
// 					onPress={authHandler}
// 					style={{ marginTop: 20 }}
// 					disabled={!formState.formIsValid}
// 				/>
// 			)}
// 		</>
// 	)
// }

// export default SignUpForm


import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signUp } from '../utils/actions/authActions';
import { ActivityIndicator, Alert } from 'react-native';
import colors from '../constants/colors';
import { useDispatch } from 'react-redux';

const initialState = {
  inputValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  // Memoize input handler to prevent unnecessary re-creations
  const inputChangedHandler = useCallback((inputId, inputValue) => {
    const result = validateInput(inputId, inputValue);
    dispatchFormState({ inputId, validationResult: result, inputValue });
  }, []);

  // Handle error alert only when necessary
  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  // Memoize authentication handler
  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const action = signUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email,
        formState.inputValues.password
      );
      await dispatch(action);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, formState.inputValues]);

  return (
    <>
      <Input
        id="firstName"
        label="First name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none"
        errorText={formState.inputValidities['firstName']}
      />

      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none"
        errorText={formState.inputValidities['lastName']}
      />

      <Input
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        onInputChanged={inputChangedHandler}
        keyboardType="email-address"
        autoCapitalize="none"
        errorText={formState.inputValidities['email']}
      />

      <Input
        id="password"
        label="Password"
        icon="lock"
        autoCapitalize="none"
        secureTextEntry
        iconPack={Feather}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities['password']}
      />

      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          title="Sign up"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignUpForm;
