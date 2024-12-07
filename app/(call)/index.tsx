import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DialogButton from "react-native-dialog/lib/Button";
import DialogContainer from "react-native-dialog/lib/Container";
import DialogTitle from "react-native-dialog/lib/Title";
import DialogDescription from "react-native-dialog/lib/Description";
export default function Page() {
	const [openDialog, setOpenDialog] = useState();
	const { signOut } = useAuth();
	return (
		<View>
			<TouchableOpacity
				style={{
					position: "absolute",
					top: 20,
					right: 20,
					zIndex: 100,
				}}
				onPress={() => setOpenDialog(true)}>
				<MaterialCommunityIcons name="exit-run" size={24} color="#5F5DEC" />
			</TouchableOpacity>

			<DialogContainer visible={openDialog}>
				<DialogTitle>Sign Out</DialogTitle>
				<DialogDescription>
					Are you sure you want to sign out of the app?
				</DialogDescription>
				<DialogButton label="Cancel" onPress={() => setOpenDialog(false)} />
				<DialogButton
					label="Sign Out"
					onPress={async () => {
						await signOut();
						setOpenDialog(false);
					}}
				/>
			</DialogContainer>
		</View>
	);
}
