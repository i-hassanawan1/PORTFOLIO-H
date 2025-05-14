import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const ECommerceApp = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>E-Commerce Store</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#FF5733" />
      ) : (
        <FlatList
          data={products.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1} // Single column for full-width cards
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ECommerceApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF5733",
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  productCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  buyButton: {
    marginTop: 10,
    backgroundColor: "#FF5733",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  buyText: {
    color: "#fff",
    fontWeight: "bold",
  },
});