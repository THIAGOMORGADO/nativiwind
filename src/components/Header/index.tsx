import React from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type ScreensPagesProps = {
  pageName: string;
};
export default function Header({ pageName }: ScreensPagesProps) {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-zinc-800 items-center flex-row h-[11%]">
      <View className="flex-row px-5 items-center">
        <Pressable className="w-[57%]">
          <Feather
            name="arrow-left"
            size={20}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        </Pressable>
        <Text className="text-white text-xl font-bold">{pageName}</Text>
      </View>
    </SafeAreaView>
  );
}
