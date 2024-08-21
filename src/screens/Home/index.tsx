import { SafeAreaView, Text, View } from "react-native";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import type { RootParamsScreen } from "../../types/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation = useNavigation<RootParamsScreen>();
  
  return (
    <SafeAreaView className=" h-full bg-slate-400 items-center justify-around">
      <View className="  w-full h-14 items-center justify-center">
        <Text>Welcome Back</Text>
      </View>

      <View className=" w-full flex-1 items-center justify-center p-10">
        {/* Header Main */}
        <View className=" bg-red-500 w-24 h-24 rounded-md items-center justify-center">
          <Text>Logo</Text>
        </View>

        <View className="items-center mb-28 mt-12">
          <Text>Company Name</Text>
          <Text>Slogan Here</Text>
        </View>
        {/* FIM HEADER MAIN */}

        {/* Main BOdy */}
        <View className="w-full h-24 px-12">
          <Button
            title="SignIn"
            onPress={() => navigation.navigate("SignIn")}
            className="bg-zinc-800 p-5 rounded-full items-center justify-center"
            Size={false}
          >
            <Text className="text-white text-xl">Sign In</Text>
          </Button>
        </View>
        <View className="w-full h-24 px-12 items-center">
          <Button
            title="SignUp"
            onPress={() => navigation.navigate("SignUp")}
            className={
              "bg-zinc-800 p-5 rounded-full items-center justify-center"
            }
            Size
          >
            <Text className="text-white text-xl">Sign Up</Text>
          </Button>
        </View>
        {/* FIM MAIN BODY */}
      </View>

      <View className="  w-full h-14">
        <Text>Footer</Text>
      </View>
    </SafeAreaView>
  );
}
