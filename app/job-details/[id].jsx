import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import Company from "../../components/jobdetails/company/Company";
import JobTabs from "../../components/jobdetails/tabs/JobTabs";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsibilites"];

const JobDetails = () => {
	const params = useLocalSearchParams();
	const router = useRouter();
	const { data, error, isLoading, reFetch } = useFetch({
		endpoint: "job-details",
		query: { job_id: params.id },
	});
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const [refreshing, setRefresh] = useState(false);
	const onRefresh = () => {
		setRefresh(true);
		reFetch();
		setRefresh(false);
	};
	return (
		<SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: COLORS.lightWhite,
					},
					headerShadowVisible: false,
					headerBackVisible: false,
					headerTitle: "",
					headerLeft: () => (
						<ScreenHeaderBtn iconUrl={icons.left} dimension='60%' handlePress={() => router.back()} />
					),
					headerRight: () => (
						<ScreenHeaderBtn iconUrl={icons.share} dimension='60%' handlePress={() => router.back()} />
					),
				}}
			/>
			<ScrollView
				style={{ minHeight: "400px" }}
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				{isLoading ? (
					<ActivityIndicator size={"large"} color={COLORS.primary} />
				) : error ? (
					<Text>Something went wrong!</Text>
				) : data.length === 0 ? (
					<Text>No Data found!</Text>
				) : (
					<View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
						<Company data={data[0]} />
						<JobTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};
export default JobDetails;
