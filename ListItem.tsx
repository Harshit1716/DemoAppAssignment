import React, {useEffect, useState, useCallback, useMemo} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';

interface ResponseType {
  body: string;
  title: string;
  id: number;
  userId: number;
}
interface ListItemProps {
  item: ResponseType;
  selectedItemId: number;
  onSelectItem: (postId: number) => void;
}

const computeDetails = (item: ResponseType) => {
  const start = performance.now();
  // can perform heavy computation function here
  const details = `Computed Details for Post ${item.id}`;
  const end = performance.now();
  console.log(`Heavy computation time for ${item.id}: ${end - start} ms`);
  return details;
};

const ListItem = ({item, selectedItemId, onSelectItem}: ListItemProps) => {
  const [postDetails, setPostDetails] = useState<ResponseType | null>(null);

  const fetchPostDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${item.id}`,
      );
      const postData = await response.json();
      setPostDetails(postData);
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  }, [item.id]);

  useEffect(() => {
    if (item.id === selectedItemId) {
      fetchPostDetails();
    }
  }, [selectedItemId, fetchPostDetails, item.id]);

  const computedDetails = useMemo(() => computeDetails(item), [item]);

  return (
    <TouchableOpacity
      style={{borderBottomWidth: 0.5}}
      onPress={() => onSelectItem(item.id)}>
      <View style={{padding: 10}}>
        <Text>{`ID: ${item.id}`}</Text>
        <Text>{`Title: ${item.title}`}</Text>
        {postDetails && item.id == selectedItemId && (
          <>
            <Text>{`Body: ${postDetails.body}`}</Text>
            <Text>{`UserID: ${postDetails.userId}`}</Text>
          </>
        )}
        <Text>{computedDetails}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
