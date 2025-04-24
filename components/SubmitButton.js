// import React from 'react';
// import { StyleSheet, TouchableOpacity, Text } from 'react-native';
// import colors from '../constants/colors';

// const SubmitButton = props => {

//     const enabledBgColor = props.color || colors.primary;
//     const disabledBgColor = colors.lightGrey;
//     const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

//     return <TouchableOpacity
//             onPress={props.disabled ? () => {} : props.onPress}
//             style={{
//                 ...styles.button,
//                 ...props.style,
//                 ...{ backgroundColor: bgColor }}}>
//         <Text style={{ color: props.disabled ? colors.grey : 'white' }}>
//             { props.title }
//         </Text>
//     </TouchableOpacity>
// };

// const styles = StyleSheet.create({
//     button: {
//         paddingHorizontal: 30,
//         paddingVertical: 10,
//         borderRadius: 30,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// });

// export default SubmitButton;

import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../constants/colors';

const SubmitButton = ({ onPress, disabled, title, color, style }) => {
  // Define background color based on disabled state
  const bgColor = disabled ? colors.lightGrey : color || colors.primary;
  
  // Define text color based on disabled state
  const textColor = disabled ? colors.grey : 'white';

  // Memoize button style object to avoid recalculating on every render
  const buttonStyle = [
    styles.button,
    style,
    { backgroundColor: bgColor }
  ];

  return (
    <TouchableOpacity
      onPress={disabled ? () => {} : onPress}
      style={buttonStyle}
    >
      <Text style={{ color: textColor }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default React.memo(SubmitButton);
