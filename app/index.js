import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
import Nearbyjobs from "../components/home/nearby/Nearbyjobs";
import Popularjobs from "../components/home/popular/Popularjobs";
import Welcome from "../components/home/welcome/Welcome";
import { COLORS, SIZES, icons, images } from "../constants";

SplashScreen.preventAutoHideAsync();

const Home = () => {
	const [fontsLoaded, fontError] = useFonts({
		DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
		DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
		DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	const [refreshing, setRefresh] = useState(false);
	const onRefresh = () => {
		setRefresh(true);
		setTimeout(() => setRefresh(false), 2000);
		// setRefresh(false);
		// reFetch();
	};

	return (
		<SafeAreaView style={{ backgroundColor: COLORS.lightWhite }} onLayout={onLayoutRootView}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />,
					headerRight: () => <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />,
					headerTitle: "",
				}}
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				<View style={{ padding: SIZES.medium }}>
					<Welcome />
					<Popularjobs />
					<Nearbyjobs />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
