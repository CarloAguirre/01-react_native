import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
const options = ["Pomodoro", "Short Break", "Long Break"]

export const Header = ({currentTime, setCurrentTime, time, setTime})=>{

    const handlePress = (index)=>{
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index)
        setTime(newTime * 60)
    }
    return(
        <View style={styles.options}>
            {
                options.map((option, index) =>(
                    <TouchableOpacity 
                    key={index} 
                    onPress={()=> 
                    handlePress(index)} 
                    style={[
                        styles.option,
                        currentTime !== index && {borderColor: "transparent"}
                        ]}>
                        <Text style={{fontWeight: "bold"}}>{option}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    options: {
        flexDirection: "row",       
    },
    option: {
        width: "33%",
        borderWidth: 3,
        borderColor: "white",
        marginVertical: 20,
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 5
    }
})