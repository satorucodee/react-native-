import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
	Text,
	TextInput,
	View,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import StyledButton from "@/components/StyledButton";
import SignInWithOAuth from "@/components/SignInWithOAuth";

export default function Page() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = React.useState("");
	const [password, setPassword] = React.useState("");

	const onSignInPress = React.useCallback(async () => {
		if (!isLoaded) {
			return;
		}

		try {
			const signInAttempt = await signIn.create({
				identifier: emailAddress,
				password,
			});

			if (signInAttempt.status === "complete") {
				await setActive({ session: signInAttempt.createdSessionId });
				router.replace("/");
			} else {
				// See https://clerk.com/docs/custom-flows/error-handling
				// for more info on error handling
				console.error(JSON.stringify(signInAttempt, null, 2));
			}
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
		}
	}, [isLoaded, emailAddress, password]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			style={{
				flex: 1,
				backgroundColor: "#5F5DEC",
				paddingHorizontal: 20,
				justifyContent: "center",
				gap: 10,
			}}>
			<MaterialIcons
				name="video-chat"
				size={160}
				color={"white"}
				style={{
					alignSelf: "center",
					paddingBottom: 20,
				}}
			/>
			<TextInput
				autoCapitalize="none"
				value={emailAddress}
				placeholder="Email..."
				style={{
					backgroundColor: "white",
					padding: 20,
					borderRadius: 10,
					width: "100%",
				}}
				onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
			/>
			<TextInput
				value={password}
				placeholder="Password..."
				secureTextEntry={true}
				style={{
					backgroundColor: "white",
					padding: 20,
					borderRadius: 10,
					width: "100%",
				}}
				onChangeText={(password) => setPassword(password)}
			/>

			{/* ⚡ Divider */}
			<View
				style={{
					backgroundColor: "white",
					height: 1,
					width: "100%",
					marginVertical: 20,
				}}
			/>

			<StyledButton title="Sign In" onPress={onSignInPress} />

			<Text
				style={{
					color: "white",
					textAlign: "center",
				}}>
				OR
			</Text>

			<SignInWithOAuth />

			{/* ⚡ Divider */}
			<View
				style={{
					backgroundColor: "white",
					height: 1,
					width: "100%",
					marginVertical: 20,
				}}
			/>

			<View
				style={{
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
					gap: 5,
				}}>
				<Text style={{ color: "white" }}>Don't have an account?</Text>
				<Link href="/sign-up">
					<Text
						style={{
							color: "white",
							fontWeight: "bold",
							textDecorationLine: "underline",
						}}>
						Sign up
					</Text>
				</Link>
			</View>
		</KeyboardAvoidingView>
	);
}
