import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import DatePicker from "react-native-datepicker";
import { COLORS } from "../config/colors";
import Spinner from "react-native-loading-spinner-overlay";

const data = [
  { label: "Sports", value: 1 },
  { label: "Cinema", value: 2 },
  { label: "Culture", value: 3 },
  { label: "Activities", value: 4 },
  { label: "Party", value: 5 },
  { label: "Events", value: 6 },
];

const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return date + "/" + month + "/" + year;
};

const FilterScreen = ({ navigation, route }) => {
  const [value, setValue] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = React.useState(data);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(getCurrentDate());
  const [isLoading, setLoading] = React.useState(true);

  //const { isFiltered, filteredEvents } = route.params;
  //console.log(isFiltered);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const filterData = async () => {
    fetch("http://10.24.40.91:3000/getFilteredEvents", {
      //  fetch("http://10.24.40.91:3000/getFilteredEvents",{
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        category_id: value,
        date: date,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        const sent = { filteredEvents: data, isFiltered: true };
        //navigation.setParams({ isFiltered: true, filteredEvents: data });

        navigation.navigate("NavigatorBar", {
          screen: "Search",
          params: { isFiltered: true, filteredEvents: data },
        });
      })
      /*.then(async (json) => {
        //console.log(json);
        const sent = { filteredEvents: json, isFiltered: true };
        navigation.navigate("NavigatorBar", sent);
      })*/
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    Promise.all([
      //fetch("http://10.24.40.91:3000/getCategories"),
      fetch("http://10.24.40.91:3000/getCategories"),
      // fetch('http://10.24.40.91:3000/getEventsByCategory')
    ])
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        setCategories(data);
      })
      .catch(function (error) {
        // if there's an error, log it
        console.log(error);
      })
      .finally(() => setLoading(false));
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={isLoading}
          //Text with the Spinner
          textContent={"Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
      ) : (
        <View>
          <Text style={styles.title}>Category</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={categories[0]}
            search
            maxHeight={300}
            labelField="description"
            valueField="id"
            placeholder={value === null ? "Select a Category" : category}
            searchPlaceholder="Search..."
            value={"test"}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.id);
              setCategory(item.description);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? "blue" : "black"}
                name="Safety"
                size={20}
              />
            )}
          />
          <Text style={styles.title}> Date</Text>
          <DatePicker
            style={{ width: "100%" }}
            date={date}
            mode="date"
            placeholder="select date"
            format="DD/MM/YYYY"
            minDate="01/01/2016"
            maxDate="01/01/2026"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              datePickerCon: { backgroundColor: "black" },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
          <View style={styles.button}>
            <TouchableOpacity style={styles.Filter} onPress={filterData}>
              <View style={styles.signIn}>
                <Text
                  style={[
                    styles.textFilter,
                    {
                      color: COLORS.greyBlue,
                    },
                  ]}
                >
                  Filter
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.beige,
    flex: 1,
  },
  title: {
    color: COLORS.greyBlue,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginBottom: 15,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  Filter: {
    width: "100%",
    backgroundColor: COLORS.lightBlue,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textFilter: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
