// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';
// import { HeaderButton } from 'react-navigation-header-buttons';
// import colors from '../constants/colors';

// const CustomHeaderButton = props => {
//     return <HeaderButton
//                 { ...props }
//                 IconComponent={Ionicons}
//                 iconSize={23}
//                 color={props.color ?? colors.blue }
//             />
// };

// export default CustomHeaderButton;


import React, { memo, useMemo } from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const CustomHeaderButton = memo(({ color, ...rest }) => {
	const resolvedColor = useMemo(() => color ?? colors.blue, [color]);

	return (
		<HeaderButton
			{...rest}
			IconComponent={Ionicons}
			iconSize={23}
			color={resolvedColor}
		/>
	);
});

export default CustomHeaderButton;
