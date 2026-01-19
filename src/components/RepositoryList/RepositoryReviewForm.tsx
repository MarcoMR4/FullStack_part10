import AuthStorageContext from "@/src/context/AuthStorageContext";
import { useThemeScheme } from "@/src/context/ThemeContext";
import { CREATE_REVIEW } from "@/src/graphql/mutations";
import { getTheme } from "@/src/theme";
import { getAuthHeader } from "@/src/utils/authHeader";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useContext } from "react";
import {
    Alert,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import * as yup from "yup";
import FormikTextInput from "../forms/FormikTextInput";
import Text from "../Text";

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required("Repository name is required"),
  ownerName: yup.string().required("Owner name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  text: yup.string().optional(),
});

interface RepositoryReviewFormProps {
  repositoryName?: string;
  ownerName?: string;
  themeScheme?: "light" | "dark";
}

const RepositoryReviewForm: React.FC<RepositoryReviewFormProps> = ({
  repositoryName,
  ownerName,
  themeScheme: propThemeScheme,
}) => {
  // Permitir themeScheme por prop o contexto
  let themeScheme = propThemeScheme;

  themeScheme = useThemeScheme().themeScheme;

  const theme = getTheme(themeScheme || "dark");
  const router = useRouter();
  const authStorage = useContext(AuthStorageContext);
  const [createReview, { loading }] = useMutation(CREATE_REVIEW);

  if (!repositoryName || !ownerName) {
    return (
      <View
        style={{
          padding: 24,
          backgroundColor: theme.colors.background,
          flex: 1,
        }}
      >
        <Text style={{ color: theme.colors.error, marginBottom: 16 }}>
          Error: Missing repository name or owner name.
        </Text>
        <TouchableWithoutFeedback onPress={() => router.back()}>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: 4,
              alignItems: "center",
              paddingVertical: 12,
              marginTop: 12,
            }}
          >
            <Text
              style={{
                color: theme.colors.textPrimary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Back
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  const initialValues = {
    repositoryName: repositoryName || "",
    ownerName: ownerName || "",
    rating: "",
    text: "",
  };

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      const rating = Number(values.rating);
      // Obtener header de autorización
      const headers = await getAuthHeader(authStorage);
      await createReview({
        variables: {
          review: {
            repositoryName: values.repositoryName,
            ownerName: values.ownerName,
            rating,
            text: values.text || null,
          },
        },
        context: {
          headers,
        },
      });
      setSubmitting(false);
      resetForm();
      // Redirigir a main y pasar un parámetro para indicar que se debe refetchear
      router.replace({ pathname: "/", params: { refetch: "1" } });
      Alert.alert(
        "Review created",
        "Your review has been submitted successfully.",
      );
    } catch (e: any) {
      setSubmitting(false);
      Alert.alert("Error", e.message || "Could not create the review");
    }
  };

  // Estilos del componente y heredados del tema
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
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ handleSubmit, isSubmitting }) => (
        <View style={styles.formContainer}>
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
            editable={false}
          />
          <FormikTextInput
            name="ownerName"
            placeholder="Owner name"
            editable={false}
          />
          <FormikTextInput
            name="rating"
            placeholder="Rating (0-100)"
            keyboardType="numeric"
          />
          <FormikTextInput
            name="text"
            placeholder="Review (optional)"
            multiline
          />
          <TouchableWithoutFeedback
            onPress={() => handleSubmit()}
            disabled={isSubmitting || loading}
          >
            <View
              style={[
                styles.button,
                (isSubmitting || loading) && { opacity: 0.6 },
              ]}
            >
              <Text style={styles.buttonText}>
                {isSubmitting || loading ? "Sending..." : "Send review"}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Formik>
  );
};

export default RepositoryReviewForm;
