import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
const StyledButton = ({
	title,
	onPress,
	style,
}: {
	title: string;
	onPress: () => void;
	style?: StyleSheet;
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				backgroundColor: "white",
				padding: 12,
				borderRadius: 5,
				width: "100%",
				...style,
			}}>
			<Text
				style={{
					color: "#5f5dec",
					fontSize: 16,
					textAlign: "center",
					fontWeight: "bold",
				}}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};
export default StyledButton;
