import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import DatePicker from "react-native-datepicker";
import { COLORS } from "../config/colors";

const data = [
  { label: "Sports", value: "1" },
  { label: "Cinema", value: "2" },
  { label: "Culture", value: "3" },
  { label: "Activities", value: "4" },
  { label: "Party", value: "5" },
  { label: "Events", value: "6" },
];

const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return date + "-" + month + "-" + year; //format: dd-mm-yyyy;
};

const FilterScreen = () => {
  const [selected, setSelected] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category</Text>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select A category"
        searchPlaceholder="Search..."
        value={selected}
        onChange={(item) => {
          setSelected(item);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        selectedStyle={styles.selectedStyle}
      />

      <Text style={styles.title}> Date</Text>
      <DatePicker
        style={{ width: "100%" }}
        date={getCurrentDate()}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-05-02"
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
          this.setState({ date: date });
        }}
      />
      <View style={styles.button}>
        <TouchableOpacity style={styles.Filter} onPress={console.log("heeey")}>
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
