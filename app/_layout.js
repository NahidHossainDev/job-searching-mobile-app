import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

const Layout = () => {
	const [fontLoaded] = useFonts({
		DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
		DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
		DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
	});

	useEffect(() => {
		const hideSplashScreen = async () => {
			if (fontLoaded) {
				await SplashScreen.hideAsync();
			}
		};

		hideSplashScreen();
	}, [fontLoaded]);

	if (!fontLoaded) {
		return null;
	}

	return <Stack />;
};

export default Layout;
