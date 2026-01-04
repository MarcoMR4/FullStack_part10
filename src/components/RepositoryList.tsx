import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 5,
  },
});

interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
}

const repositories: Repository[] = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

const ItemSeparator = () => <View style={styles.separator} />;


const renderItem = ({ item }: { item: Repository }) => (
  <View style={{ backgroundColor: '#222', padding: 16, borderRadius: 8 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }} />
      <View style={{ flex: 1 }}>
        <Text color="textSecondary" fontWeight="bold" fontSize="subheading" style={{ marginBottom: 4 }}>{item.fullName}</Text>
        <Text style={{ color: 'white', marginTop: 4 }}>{item.description}</Text>
        <Text style={{ color: '#61dafb', marginTop: 4 }}>{item.language}</Text>
      </View>
    </View>
    <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginTop: 10 }}>
      <Text style={{ color: 'white' }}>Stars: {item.stargazersCount}</Text>
      <Text style={{ color: 'white' }}>Forks: {item.forksCount}</Text>
      <Text style={{ color: 'white' }}>Reviews: {item.reviewCount}</Text>
      <Text style={{ color: 'white' }}>Rating: {item.ratingAverage}</Text>
    </View>
  </View>
);

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;