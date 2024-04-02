import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Text, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { supabase } from "../utils/supabase.js";

export default function ProduceList() {
  const [produce, setProduce] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if(search === '') {
        loadProduce();
    }
    else {
        searchProduce();
    }
  }, [search]);
  async function loadProduce() {
    try {
      const { data, error, status } = await supabase
        .from("produce")
        .select(`produce_name, produce_code, id`);
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProduce(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }
  async function searchProduce() {
    try {
      const { data, error, status } = await supabase
        .from("produce")
        .select(`produce_name, produce_code, id`)
        .ilike('produce_name', `%${search}%`)
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProduce(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }
  return (
    <View contentContainerStyle={styles.container}>
      <View style={{ paddingTop: 35 }} />
      <SearchBar
        placeholder="Search..."
        onChangeText={setSearch}
        value={search}
        lightTheme
        round
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
      ></SearchBar>
      <View style={styles.header}>
        <Text style={styles.headerText}>Produce Name</Text>
        <Text style={styles.headerText}>Produce Code</Text>
      </View>
      <View style={styles.separator} />
      <ScrollView contentContainerStyle={styles.container}>
        {produce.map((item) => {
          return (
            <View key={item.id} style={styles.item}>
              <Text style={styles.text}>{item.produce_name}</Text>
              <Text style={styles.text}>{item.produce_code}</Text>
            </View>
          );
        })}
        <View style={{ paddingBottom: 360 }} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: 16,
},
searchInputContainer: {
    backgroundColor: '#f0f0f0',
},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    padding: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 2,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    height: 40,
  },
  text: {
    fontSize: 16,
  },
});
