import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import { useState } from "react";
import { COLORS, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import PopularJobsCard from "../../common/cards/popular/PopularJobCard";
import styles from "./popularjobs.style";

const Popularjobs = () => {
	const router = useRouter();
	const { data, error, isLoading, reFetch } = useFetch({
		endpoint: "search",
		query: { query: "React developer", num_pages: 1 },
	});
	const [selectedJob, setSelectedJob] = useState();

	const handleCardPress = (item) => {
		setSelectedJob(item.job_id);
		router.push(`/job-details/${item.job_id}`);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Popular Job</Text>
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
					<FlatList
						horizontal
						contentContainerStyle={{ columnGap: SIZES.medium }}
						data={data}
						renderItem={({ item }) => (
							<PopularJobsCard item={item} selectedJob={selectedJob} handleCardPress={handleCardPress} />
						)}
						keyExtractor={(item) => item.job_id}
					/>
				)}
			</View>
		</View>
	);
};

export default Popularjobs;
