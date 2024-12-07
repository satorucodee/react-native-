import {
	TextInput,
	Button,
	View,
	KeyboardAvoidingView,
	Platform,
	Text,
    Alert,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import StyledButton from "@/components/StyledButton";

export default function SignUpScreen() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");

	const onSignUpPress = async () => {
		if (!isLoaded) {
			return;
		}

		try {
			await signUp.create({
				emailAddress,
				password,
			});

			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

			setPendingVerification(true);
		} catch (err: any) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	};

	const onPressVerify = async () => {
		if (!isLoaded) {
			return;
		}

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			});

			if (completeSignUp.status === "complete") {
				await setActive({ session: completeSignUp.createdSessionId });
				router.replace("/");
			} else {
				console.error(JSON.stringify(completeSignUp, null, 2));
			}
		} catch (err: any) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			Alert.alert(
				"Error",
				"Looks like you entered an incorrect code \n Please try again."
			);
		}
	};

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
			{!pendingVerification && (
				<View style={{ gap: 10 }}>
					<Text
						style={{
							color: "white",
							fontSize: 18,
							marginBottom: 20,
							textAlign: "center",
						}}>
						{"Enter your details to get started"}
					</Text>
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
						onChangeText={(email) => setEmailAddress(email)}
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
					<StyledButton title="Sign Up" onPress={onSignUpPress} />
				</View>
			)}
			{pendingVerification && (
				<>
					<Text
						style={{
							color: "white",
							fontSize: 18,
							marginBottom: 20,
							textAlign: "center",
						}}>
						{"Enter the code we sent to your email"}
					</Text>
					<TextInput
						value={code}
						placeholder="Code..."
						style={{
							backgroundColor: "white",
							padding: 20,
							borderRadius: 10,
							width: "100%",
						}}
						onChangeText={(code) => setCode(code)}
					/>
					<StyledButton title="Verify Email" onPress={onPressVerify} />
				</>
			)}
		</KeyboardAvoidingView>
	);
}
