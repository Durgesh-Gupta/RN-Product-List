import React from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetails from "./ProductDetails";

export default function App() {
  const [ProductList, setProductList] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(false)

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setisLoading(true)
    fetch("https://dummyjson.com/products")
      .then(async (res) => {
        let JsonReponse = await res.json();
        setProductList(JsonReponse.products);
        setisLoading(false)
      })
      .then(console.log);
  };



  function HomeScreen(props) {

    const RenderItem = ({ item }) => {
      return (
        <Pressable style={styles.ProductContainer} onPress={() => props.navigation.navigate("Product", { productId: item.id })}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={{ uri: item.thumbnail }}
              style={{
                width: 110,
                height: 110,
                resizeMode: "cover",
                borderRadius: 60,
              }}
            />
          </View>
          <View style={{ flex: 2, padding: 10 }}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={3}>
              {item.description}
            </Text>
          </View>
        </Pressable>
      );
    };
    if (isLoading) {
      return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <ActivityIndicator size={"large"} />
        </View >
      )
    }

    return (
      <FlatList
        style={{
          backgroundColor: "#fff",
        }}
        stickyHeaderIndices={[0]}

        renderItem={RenderItem}
        data={ProductList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <View style={styles.headingText}>
              <Text style={styles.headingText}>Product Page</Text>
            </View>
          );
        }}
      />
    );
  }

  const Stack = createNativeStackNavigator();




  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Product" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
    padding: 15,
  },
  headingText: {
    textAlign: "left",
    fontSize: 22,
    fontWeight: "bold", backgroundColor: "#fff",
    height: 40

  },
  ProductContainer: {
    flex: 1,
    borderWidth: 1,
    flexDirection: "row",
    marginVertical: 5,
    borderColor: "gray",
    borderRadius: 20,
    paddingVertical: 4,
    backgroundColor: "#fff",

  },
  productTitle: {
    fontSize: 22,
  },
  description: {
    fontSize: 14,
    color: "grey",
  },
});
