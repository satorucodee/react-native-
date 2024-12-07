import { Redirect, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { View } from "react-native";
import {
	LogLevel,
	logLevels,
	StreamCall,
	StreamVideo,
	StreamVideoClient,
	User,
} from "@stream-io/video-react-native-sdk";

const apiKey = process.env.EXPO_PUBLIC_GET_STREAM_API_KEY;

if (!apiKey) {
	throw new Error("EXPO_PUBLIC_GET_STREAM_API_KEY is not set.");
}

function CallRoutesLayout() {
	const { isSignedIn } = useAuth();
	const { user: clerkUser } = useUser();

	if (!isSignedIn || !clerkUser || apiKey) {
		return <Redirect href={"/(auth)/sign-in"} />;
	}

	const user: User = {
		id: clerkUser.id,
		image: clerkUser.imageUrl,
		name: clerkUser.fullName,
	};

	const client = new StreamVideoClient({
		apiKey,
		user,
		tokenProvider,
		options: {
			logger: (logLevels: LogLevel, message: string, ...args: unknown[]) => {},
		},
	});

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StreamVideo client={client}>
				<Tabs
					screenOptions={({ route }) => ({
						headerShown: false,
						tabBarActiveTintColor: "#5F5DEC",
						tabBarStyle: {
							display: route.name === "[id]" ? "none" : "flex",
						},
						tabBarLabelStyle: {
							zIndex: 100,
							paddingBottom: 5,
						},
					})}>
					<Tabs.Screen
						name="index"
						options={{
							title: "All Calls",
							tabBarIcon: ({ color }) => (
								<Ionicons name="call-outline" size={24} color={color} />
							),
						}}
					/>

					<Tabs.Screen
						name="[id]"
						options={{
							title: "Start a New Call",
							unmountOnBlur: true,
							header: () => null,
							tabBarIcon: ({ color }) => {
								return (
									<View
										style={{
											backgroundColor: "white",
											borderRadius: 50,
											position: "absolute",
											alignItems: "center",
											justifyContent: "center",
											top: -10,
											right: 20,
											left: 20,
											bottom: 0,
											margin: "auto",
											zIndex: 100,
											borderColor: "lightgray",
											borderWidth: 0.2,
											borderTopWidth: 1,
											borderBottomWidth: 0,
											elevation: 5, // Added elevation for shadow effect
										}}>
										<FontAwesome
											name="plus-circle"
											size={30}
											color="black"
											style={{
												zIndex: 200,
											}}
										/>
									</View>
								);
							},
						}}
					/>

					<Tabs.Screen
						name="join"
						options={{
							title: "Join Calls",
							headerTitle: "Enter the Room ID",
							tabBarIcon: ({ color }) => (
								<Ionicons name="enter-outline" size={24} color={color} />
							),
						}}
					/>
				</Tabs>
			</StreamVideo>
		</SafeAreaView>
	);
}
export default CallRoutesLayout;
