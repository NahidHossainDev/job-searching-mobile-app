import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./popularjobcard.style.js";
const PopularJobCard = ({ selectedJob, item, handleCardPress }) => {
	const { employer_logo, employer_name, job_title, job_country } = item || {};
	return (
		<TouchableOpacity style={styles.container(selectedJob, item)} onPress={() => handleCardPress(item)}>
			<TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
				<Image source={{ uri: employer_logo }} resizeMode='contain' style={styles.logoImage} />
			</TouchableOpacity>
			<Text style={styles.companyName} numberOfLines={1}>
				{employer_name}
			</Text>

			<View style={styles.infoContainer}>
				<Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
					{job_title}
				</Text>
				<Text style={job_country}>{job_country}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default PopularJobCard;
