import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import Company from "../../components/jobdetails/company/Company";
import JobTabs from "../../components/jobdetails/tabs/Tabs";
import { COLORS, icons } from "../../constants";
import useFetch from "../../hook/useFetch";

const JobDetails = () => {
	const params = useLocalSearchParams();
	const router = useRouter();
	const { data, error, isLoading, reFetch } = useFetch({
		endpoint: "job-details",
		query: { job_id: params.id },
	});
	const [refreshing, setRefresh] = useState(false);
	const onRefresh = () => {};

	console.log(data, error);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: COLORS.lightWhite,
					},
					headerShadowVisible: false,
					headerBackVisible: false,
					headerLeft: () => (
						<ScreenHeaderBtn iconUrl={icons.left} dimension='60%' handlePress={() => router.back()} />
					),
					headerRight: () => (
						<ScreenHeaderBtn iconUrl={icons.share} dimension='60%' handlePress={() => router.back()} />
					),
					headerTitle: "",
					headerTitleAlign: "center",
				}}
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				>
					<View>
						{isLoading ? (
							<ActivityIndicator size={"large"} color={COLORS.primary} />
						) : error ? (
							<Text>Something went wrong!</Text>
						) : data.length === 0 ? (
							<Text>No Data found!</Text>
						) : (
							<View>
								<Company data={data} />
								<JobTabs data={data} />
							</View>
						)}
					</View>
				</ScrollView>
			</Stack.Screen>
		</SafeAreaView>
	);
};
export default JobDetails;
