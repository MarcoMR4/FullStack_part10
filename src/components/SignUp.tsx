import AuthStorageContext from "@/src/context/AuthStorageContext";
import { useThemeScheme } from "@/src/context/ThemeContext";
import { SIGN_IN, SIGN_UP } from "@/src/graphql/mutations";
import { getTheme } from "@/src/theme";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import * as yup from "yup";
import FormikTextInput from "./forms/FormikTextInput";
import Text from "./Text";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Username must be between 1 and 20 characters")
    .max(20, "Username must be between 1 and 20 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be between 5 and 20 characters")
    .max(20, "Password must be between 5 and 20 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const SignUp: React.FC = () => {
  const { themeScheme } = useThemeScheme();
  const theme = getTheme(themeScheme);
  const [signUp, { loading: loadingSignUp }] = useMutation(SIGN_UP);
  const [signIn, { loading: loadingSignIn }] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const styles = StyleSheet.create({
    formContainer: {
      padding: 16,
      paddingTop: 40,
      borderRadius: 8,
      gap: 30,
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 4,
      alignItems: "center",
      paddingVertical: 12,
      marginTop: 12,
    },
    buttonText: {
      color: theme.colors.textPrimary,
      fontWeight: "bold",
      fontSize: 16,
    },
    errorText: {
      color: theme.colors.error,
      marginBottom: 8,
      fontSize: 14,
    },
  });

  const onSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: any,
  ) => {
    setErrorMsg(null);
    try {
      // Sign up mutation
      const { data } = await signUp({
        variables: {
          user: {
            username: values.username,
            password: values.password,
          },
        },
      });
      if ((data as any)?.createUser?.id) {
        Alert.alert("Sign up successful", "Your account has been created.");
        // Login mutation
        const result: any = await signIn({
          variables: {
            credentials: {
              username: values.username,
              password: values.password,
            },
          },
        });
        const accessToken = result?.data?.authenticate?.accessToken;
        if (accessToken && authStorage) {
          await authStorage.setAccessToken(accessToken);
          await apolloClient.resetStore();
          resetForm();
          router.replace("/");
        }
      }
      setSubmitting(false);
    } catch (e: any) {
      setSubmitting(false);
      setErrorMsg(e.message || "Could not sign up");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting }) => (
        <View style={styles.formContainer}>
          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <FormikTextInput
            name="confirmPassword"
            placeholder="Confirm password"
            secureTextEntry
          />
          <TouchableWithoutFeedback
            onPress={() => handleSubmit()}
            disabled={isSubmitting || loadingSignUp || loadingSignIn}
          >
            <View
              style={[
                styles.button,
                (isSubmitting || loadingSignUp || loadingSignIn) && {
                  opacity: 0.6,
                },
              ]}
            >
              {isSubmitting || loadingSignUp || loadingSignIn ? (
                <ActivityIndicator color={theme.colors.textPrimary} />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
