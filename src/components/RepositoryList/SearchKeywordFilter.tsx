import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useThemeScheme } from "../../context/ThemeContext";
import { getTheme } from "../../theme";

interface SearchKeywordFilterProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
}

const SearchKeywordFilter: React.FC<SearchKeywordFilterProps> = ({
  keyword,
  onKeywordChange,
}) => {
  const { themeScheme } = useThemeScheme();
  const theme = getTheme(themeScheme);
  const [inputValue, setInputValue] = useState(keyword);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      onKeywordChange(inputValue);
    }, 400);
    return () => clearTimeout(handler);
  }, [inputValue, onKeywordChange]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.primary,
        },
      ]}
    >
      <FontAwesome
        name="search"
        size={22}
        color={theme.colors.icon}
        style={styles.icon}
      />
      <TextInput
        style={[
          styles.input,
          { color: theme.colors.textPrimary, fontFamily: theme.fonts.main },
        ]}
        placeholder="Search repositories..."
        placeholderTextColor={theme.forms.placeholder}
        value={inputValue}
        onChangeText={setInputValue}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 44,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 44,
  },
});

export default SearchKeywordFilter;
