import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./nearbyjobcard.style";

const NearbyJobCard = ({ item, handleCardPress }) => {
	const { employer_logo, job_employment_type, job_title } = item || {};
	return (
		<TouchableOpacity style={styles.container} onPress={() => handleCardPress(item)}>
			<TouchableOpacity style={styles.logoContainer}>
				<Image source={{ uri: employer_logo }} resizeMode='contain' style={styles.logImage} />
			</TouchableOpacity>

			<View style={styles.textContainer}>
				<Text style={styles.jobName} numberOfLines={1}>
					{job_title}
				</Text>
				<Text style={styles.jobType}>{job_employment_type}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default NearbyJobCard;
