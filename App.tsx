import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import ListItem from './ListItem';
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

interface ResponseType {
  body: string;
  title: string;
  id: number;
  userId: number;
}
const App = () => {
  const [data, setData] = useState<ResponseType[]>([]);
  const [flag, setFlag] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const jsonData = (await response.json()) as ResponseType[];
        console.log(jsonData[0]);
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleSelectItem = (postId: number) => {
    setSelectedId(postId);
  };

  return (
    <View style={{flex: 1, paddingTop: 20}}>
      <Button
        title="Re render"
        onPress={() => {
          setFlag(!flag);
        }}
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        // renderItem={renderItem}
        ListFooterComponent={() => <View style={{height: 100}} />}
        renderItem={({item}: {item: ResponseType}) => (
          <ListItem
            item={item}
            selectedItemId={selectedId}
            onSelectItem={handleSelectItem}
          />
        )}
      />
      {/* <ListItem item={data[0]} /> */}
    </View>
  );
};

export default App;
