// import { Feather, FontAwesome } from '@expo/vector-icons'
// import React, { useCallback, useReducer, useState } from 'react'
// import {
// 	View,
// 	Text,
// 	StyleSheet,
// 	ActivityIndicator,
// 	ScrollView,
// 	TouchableOpacity,
// 	Button,Image
// } from 'react-native'
// import { useDispatch, useSelector } from 'react-redux'
// import Input from '../components/Input'
// import PageContainer from '../components/PageContainer'
// import PageTitle from '../components/PageTitle'
// import ProfileImage from '../components/ProfileImage'
// import SubmitButton from '../components/SubmitButton'
// import colors from '../constants/colors'
// import { updateLoggedInUserData } from '../store/authSlice'
// import {
// 	updateSignedInUserData,
// 	userLogout
// } from '../utils/actions/authActions'
// import { validateInput } from '../utils/actions/formActions'
// import { reducer } from '../utils/reducers/formReducer'

// const SettingsScreen = props => {
// 	const dispatch = useDispatch()

// 	const [isLoading, setIsLoading] = useState(false)
// 	const [showSuccessMessage, setShowSuccessMessage] = useState(false)
// 	const { authData } = useSelector(state => state.auth)

// 	const firstName = authData?.firstName || ''
// 	const lastName = authData?.lastName || ''
// 	const email = authData?.email || ''
// 	const about = authData?.about || ''
// 	const initialState = {
// 		inputValues: {
// 			firstName,
// 			lastName,
// 			email,
// 			about
// 		},
// 		inputValidities: {
// 			firstName: undefined,
// 			lastName: undefined,
// 			email: undefined,
// 			about: undefined
// 		},
// 		formIsValid: false
// 	}

// 	const [formState, dispatchFormState] = useReducer(reducer, initialState)

// 	const inputChangedHandler = useCallback(
// 		(inputId, inputValue) => {
// 			const result = validateInput(inputId, inputValue)
// 			dispatchFormState({ inputId, validationResult: result, inputValue })
// 		},
// 		[dispatchFormState]
// 	)

// 	const saveHandler = useCallback(async () => {
// 		const updatedValues = formState.inputValues

// 		try {
// 			setIsLoading(true)
// 			// await updateSignedInUserData(authData.uid, updatedValues)
// 			dispatch(updateLoggedInUserData({ newData: updatedValues }))

// 			setShowSuccessMessage(true)

// 			setTimeout(() => {
// 				setShowSuccessMessage(false)
// 			}, 3000)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setIsLoading(false)
// 		}
// 	}, [formState, dispatch])

// 	const hasChanges = () => {
// 		const currentValues = formState.inputValues

// 		return (
// 			currentValues.firstName != firstName ||
// 			currentValues.lastName != lastName ||
// 			currentValues.email != email ||
// 			currentValues.about != about
// 		)
// 	}

// 	return (
// 		<PageContainer>
// 			<PageTitle text="Settings" />

// 			<ScrollView contentContainerStyle={styles.formContainer}>
// 				<ProfileImage
// 					size={80}
// 					userId={authData?.uid}
// 					uri={authData?.profilePicture}
// 					showEditButton={true}
// 				/>

// 				<Input
// 					id="firstName"
// 					label="First name"
// 					icon="user-o"
// 					iconPack={FontAwesome}
// 					onInputChanged={inputChangedHandler}
// 					autoCapitalize="none"
// 					errorText={formState.inputValidities['firstName']}
// 					initialValue={authData?.firstName}
// 				/>

// 				<Input
// 					id="lastName"
// 					label="Last name"
// 					icon="user-o"
// 					iconPack={FontAwesome}
// 					onInputChanged={inputChangedHandler}
// 					autoCapitalize="none"
// 					errorText={formState.inputValidities['lastName']}
// 					initialValue={authData?.lastName}
// 				/>

// 				<Input
// 					id="email"
// 					label="Email"
// 					icon="mail"
// 					iconPack={Feather}
// 					onInputChanged={inputChangedHandler}
// 					keyboardType="email-address"
// 					autoCapitalize="none"
// 					errorText={formState.inputValidities['email']}
// 					initialValue={authData?.email}
// 				/>

// 				<Input
// 					id="about"
// 					label="About"
// 					icon="user-o"
// 					iconPack={FontAwesome}
// 					onInputChanged={inputChangedHandler}
// 					autoCapitalize="none"
// 					errorText={formState.inputValidities['about']}
// 					initialValue={authData?.about}
// 				/>

// 				<View style={{ marginTop: 20 }}>
// 					{showSuccessMessage && <Text>Saved!</Text>}

// 					{isLoading ? (
// 						<ActivityIndicator
// 							size={'small'}
// 							color={colors.primary}
// 							style={{ marginTop: 10 }}
// 						/>
// 					) : (
// 						hasChanges() && (
// 							<SubmitButton
// 								title="Save"
// 								onPress={saveHandler}
// 								style={{ marginTop: 20 }}
// 								disabled={!formState.formIsValid}
// 							/>
// 						)
// 					)}
// 				</View>

// 				<SubmitButton
// 					title="Logout"
// 					onPress={() => dispatch(userLogout())}
// 					style={{ marginTop: 20 }}
// 					color={colors.red}
// 				/>
// 			</ScrollView>
// 		</PageContainer>
// 	)
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1
// 	},
// 	formContainer: {
// 		alignItems: 'center'
// 	}
// })

// export default SettingsScreen

import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useReducer, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import PageContainer from "../../components/PageContainer";
import PageTitle from "../../components/PageTitle";
import ProfileImage from "../../components/ProfileImage";
import SubmitButton from "../../components/SubmitButton";
import colors from "../../constants/colors";
import { updateLoggedInUserData } from "../../store/authSlice";
import {
  updateSignedInUserData,
  userLogout,
} from "../../utils/actions/authActions";
import { validateInput } from "../../utils/actions/formActions";
import { reducer } from "../../utils/reducers/formReducer";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { authData } = useSelector((state) => state.auth);

  const firstName = authData?.firstName || "";
  const lastName = authData?.lastName || "";
  const email = authData?.email || "";
  const about = authData?.about || "";
  const initialState = useMemo(
    () => ({
      inputValues: {
        firstName,
        lastName,
        email,
        about,
      },
      inputValidities: {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        about: undefined,
      },
      formIsValid: false,
    }),
    [firstName, lastName, email, about]
  );

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const saveHandler = useCallback(async () => {
    const updatedValues = formState.inputValues;

    try {
      setIsLoading(true);
      dispatch(updateLoggedInUserData({ newData: updatedValues }));
      setShowSuccessMessage(true);

      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [formState, dispatch]);

  const hasChanges = () => {
    const currentValues = formState.inputValues;
    return (
      currentValues.firstName !== firstName ||
      currentValues.lastName !== lastName ||
      currentValues.email !== email ||
      currentValues.about !== about
    );
    // }, [formState.inputValues, firstName, lastName, email, about])
  };

  return (
    <PageContainer>
      <PageTitle text="Settings" />

      <ScrollView contentContainerStyle={styles.formContainer}>
        <ProfileImage
          size={80}
          userId={authData?.uid}
          uri={authData?.profilePicture}
          showEditButton={true}
        />

        <Input
          id="firstName"
          label="First name"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["firstName"]}
          initialValue={authData?.firstName}
        />

        <Input
          id="lastName"
          label="Last name"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["lastName"]}
          initialValue={authData?.lastName}
        />

        <Input
          id="email"
          label="Email"
          icon="mail"
          iconPack={Feather}
          onInputChanged={inputChangedHandler}
          keyboardType="email-address"
          autoCapitalize="none"
          errorText={formState.inputValidities["email"]}
          initialValue={authData?.email}
        />

        <Input
          id="about"
          label="About"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["about"]}
          initialValue={authData?.about}
        />

        <View style={{ marginTop: 20 }}>
          {showSuccessMessage && <Text>Saved!</Text>}

          {isLoading ? (
            <ActivityIndicator
              size={"small"}
              color={colors.primary}
              style={{ marginTop: 10 }}
            />
          ) : (
            hasChanges() && (
              <SubmitButton
                title="Save"
                onPress={saveHandler}
                style={{ marginTop: 20 }}
                disabled={!formState.formIsValid}
              />
            )
          )}
        </View>

        <SubmitButton
          title="Logout"
          onPress={() => dispatch(userLogout())}
          style={{ marginTop: 20 }}
          color={colors.red}
        />
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    alignItems: "center",
  },
});

export default SettingsScreen;
