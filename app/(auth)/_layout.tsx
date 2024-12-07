import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

function AuthRoutesLayout() {
	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		return <Redirect href="/(call)" />;
	}

	return (
		<SafeAreaView style={{flex:1}}>
			<Stack>
				<Stack.Screen
					name="sign-in"
					options={{
						title: "Sign In to get Started",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="sign-up"
					options={{
						title: "Create a new account",
						headerShown: true,
						headerBackTitle: "Sign In",
						headerStyle: { backgroundColor: "#5f5dec" },
						headerTintColor: "white",
					}}
				/>
			</Stack>
		</SafeAreaView>
	);
}
export default AuthRoutesLayout;
