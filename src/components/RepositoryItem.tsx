import React from 'react';
import {
    Image,
    View
} from 'react-native';

import { Repository } from '../types/respository';
import { overThousandFormatter } from '../utils/quantitiesFormatters';
import Text from './Text';


const RepositoryItem = ({ item }: { item: Repository }) => (
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
      <Text style={{ color: 'white' }}>Stars: {overThousandFormatter.format(item.stargazersCount)}</Text>
      <Text style={{ color: 'white' }}>Forks: {overThousandFormatter.format(item.forksCount)}</Text>
      <Text style={{ color: 'white' }}>Reviews: {overThousandFormatter.format(item.reviewCount)}</Text>
      <Text style={{ color: 'white' }}>Rating: {item.ratingAverage}</Text>
    </View>
  </View>
);

export default RepositoryItem;
