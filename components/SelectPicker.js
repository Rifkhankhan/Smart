// import { StyleSheet, Text, TextInput, View } from "react-native";
// import { Picker } from "@react-native-picker/picker";

// import colors from "../constants/colors";
// import { useState } from "react";

// const SelectPicker = (props) => {
//   const [value, setValue] = useState(props.initialValue);

//   const onChangeText = (text) => {
//     setValue(text);
//     props.onInputChanged(props.id, text);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>{props.label}</Text>

//       <View style={styles.inputContainer}>
//         {props.icon && (
//           <props.iconPack
//             name={props.icon}
//             size={props.iconSize || 15}
//             style={styles.icon}
//           />
//         )}
//         <Picker
//           {...props}
//           style={styles.input}
//           selectedValue={value}
//           onValueChange={onChangeText}
//         >
//           {props.datas.map((data) => (
//             <Picker.Item
//               label={data.name}
//               value={data.shopKey}
//               key={data.shopKey}
//             />
//           ))}
//         </Picker>
//       </View>

//       {props.errorText && (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{props.errorText[0]}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//   },
//   label: {
//     marginVertical: 8,
//     fontFamily: "bold",
//     letterSpacing: 0.3,
//     color: colors.textColor,
//   },
//   inputContainer: {
//     width: "100%",
//     backgroundColor: "red",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 2,
//     backgroundColor: colors.nearlyWhite,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   icon: {
//     marginRight: 10,
//     color: colors.grey,
//   },
//   input: {
//     color: colors.textColor,
//     flex: 1,
//     fontFamily: "regular",
//     letterSpacing: 0.3,
//     paddingTop: 0,
//   },
//   errorContainer: {
//     marginVertical: 5,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 13,
//     fontFamily: "regular",
//     letterSpacing: 0.3,
//   },
// });

// export default SelectPicker;

import React, { useState, useCallback } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import colors from "../constants/colors";

const SelectPicker = ({
  initialValue,
  label,
  icon,
  iconPack: IconPack,
  iconSize = 15,
  datas,
  onInputChanged,
  errorText,
  id,
}) => {
  const [value, setValue] = useState(initialValue);

  // Use useCallback to prevent the onChangeText function from being recreated on every render
  const onChangeText = useCallback(
    (text) => {
      setValue(text);
      onInputChanged(id, text);
    },
    [onInputChanged, id] // Dependencies to avoid unnecessary recreations
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        {icon && IconPack && (
          <IconPack name={icon} size={iconSize} style={styles.icon} />
        )}

        <Picker
          selectedValue={value}
          onValueChange={onChangeText}
          style={styles.input}
        >
          {datas.map((data) => (
            <Picker.Item
              label={data.name}
              value={data.shopKey}
              key={data.shopKey}
            />
          ))}
        </Picker>
      </View>

      {errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText[0]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
    fontFamily: "bold",
    letterSpacing: 0.3,
    color: colors.textColor,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
    backgroundColor: colors.nearlyWhite,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
    color: colors.grey,
  },
  input: {
    color: colors.textColor,
    flex: 1,
    fontFamily: "regular",
    letterSpacing: 0.3,
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
});

export default SelectPicker;
