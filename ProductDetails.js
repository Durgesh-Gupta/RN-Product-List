import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const ProductDetails = (props) => {
    const { productId } = useRoute().params;
    const [ProductData, setProductData] = React.useState({});
    const [isLoading, setisLoading] = React.useState(true);

    React.useEffect(() => {
        setisLoading(true);
        if (productId) {
            fetchData(productId);
        }
    }, [productId]);

    const fetchData = (id) => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((res) => {
                const discountAmount = (res.price * res.discountPercentage) / 100;

                const currentPrice = (res.price - discountAmount).toFixed(2);

                setProductData({ ...res, currentPrice });
                setisLoading(false);
            });
    };
    if (isLoading) {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }


    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <View
                style={[
                    styles.headingText,
                    { flexDirection: "row", alignItems: "center" },
                ]}
            >
                <Pressable
                    style={{ paddingRight: 20 }}
                    onPress={() => props.navigation.goBack()}
                >
                    <Image
                        source={require("./assets/arrow.png")}
                        style={{ width: 20, height: 20 }}
                    />
                </Pressable>
                <Text style={styles.headingText}>Product details</Text>
            </View>
            <View style={{ position: "relative", marginVertical: 20 }}>
                <View
                    style={{
                        position: "absolute",
                        zIndex: 99,
                        backgroundColor: "white",
                        padding: 5,
                        borderRadius: 20,
                        bottom: 10,
                        right: 20,
                    }}
                >
                    <Text style={{ fontSize: 8 }}>
                        {ProductData.images.length} Images
                    </Text>
                </View>
                <FlatList
                    data={ProductData.images}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={{
                                width: width - 30,
                                height: 280,
                                resizeMode: "cover",
                                borderRadius: 20,
                            }}
                        />
                    )}
                    horizontal
                    pagingEnabled
                />
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.title}>{ProductData.title}</Text>
                <Text style={styles.desc}>{ProductData.description}</Text>
                <Text style={styles.price}>
                    {" "}
                    ₹{" "}
                    <Text
                        style={{
                            textDecorationLine: "line-through",
                            color: "gray",
                            fontSize: 22,
                        }}
                    >
                        {ProductData.price}
                    </Text>{" "}
                    {ProductData.currentPrice}
                </Text>
            </View>
        </View>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    headingText: {
        textAlign: "left",
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: "#fff",
        height: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    desc: {
        fontSize: 16,
    },
    price: {
        fontSize: 26,
        fontWeight: "bold",
        marginVertical: 2,
    },
});
