import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SIZES, icons } from "../../../constants";
import styles from "./welcome.style";

const jobTypes = ["Full-time", "Part-time", "Contractor", "Full-time2", "Part-time2", "Contractor2"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
	const [activeJobType, setActiveJobType] = useState("");
	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.userName}>Hello Adrian</Text>
				<Text style={styles.welcomeMessage}>Find your perfect job</Text>
			</View>
			<View style={styles.searchContainer}>
				<View style={styles.searchWrapper}>
					<TextInput
						style={styles.searchInput}
						value=''
						onChange={() => {}}
						placeholder='What are you lookinng'
					/>
				</View>
				<TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
					<Image source={icons.search} resizeMode='contain' style={styles.searchBtnImage} />
				</TouchableOpacity>
			</View>
			<View style={styles.tabsContainer}>
				<FlatList
					horizontal
					contentContainerStyle={{ columnGap: SIZES.small }}
					data={jobTypes}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.tab(activeJobType, item)}
							onPress={() => {
								setActiveJobType(item);
								router.push(`/search/${item}`);
							}}
						>
							<Text style={styles.tabText}>{item}</Text>
						</TouchableOpacity>
					)}
				/>
			</View>
		</View>
	);
};

export default Welcome;
