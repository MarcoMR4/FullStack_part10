import { Picker } from "@react-native-picker/picker";
import React from "react";
import { useThemeScheme } from "../../context/ThemeContext";
import { getTheme } from "../../theme";
import {
    FilterToQuery,
    RepositoryListFilterProps,
} from "../../types/repositoryListFilters";

const FILTER_OPTIONS = [
  { label: "Latest repositories", value: "latest" },
  { label: "Highest rated repositories", value: "highest" },
  { label: "Lowest rated repositories", value: "lowest" },
];

const RepositoryListFilter: React.FC<RepositoryListFilterProps> = ({
  filter,
  onFilterChange,
}) => {
  const { themeScheme } = useThemeScheme();
  const currentTheme = getTheme(themeScheme);
  return (
    <Picker
      selectedValue={filter}
      onValueChange={(value) => onFilterChange(value as keyof FilterToQuery)}
      style={{
        height: 60,
        color: currentTheme.colors.textPrimary,
        backgroundColor: currentTheme.colors.background,
      }}
      itemStyle={{ color: currentTheme.colors.textPrimary }}
    >
      {FILTER_OPTIONS.map((option) => (
        <Picker.Item
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </Picker>
  );
};

export default RepositoryListFilter;
