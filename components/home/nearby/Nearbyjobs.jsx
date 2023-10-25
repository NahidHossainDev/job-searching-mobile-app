import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import styles from "./nearbyjobs.style";

const Nearbyjobs = () => {
	const router = useRouter();
	const { data, error, isLoading, reFetch } = useFetch({
		endpoint: "search",
		query: { query: "React developer", num_pages: 1 },
	});

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Nearby Jobs</Text>
				<TouchableOpacity>
					<Text style={styles.headerBtn}>See All</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.cardsContainer}>
				{isLoading ? (
					<ActivityIndicator size={"large"} color={COLORS.primary} />
				) : !!error ? (
					<Text>Something went wrong</Text>
				) : (
					data?.map((item) => (
						<NearbyJobCard
							item={item}
							key={`nearby-job-${item.job_id}`}
							handleCardPress={() => router.push(`/job-details/${item.job_id}`)}
						/>
					))
				)}
			</View>
		</View>
	);
};

export default Nearbyjobs;
