import {
  TextInput,
  View,
  TextInputProps,
  TouchableNativeFeedback,
  Keyboard,
} from "react-native";
import {} from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  title?: string;
  iconName: string;
  size: number;
  color: string;
  className?: string;
}

export default function Input({
  title,
  iconName,
  color,
  size,
  className,
  ...rest
}: InputProps) {
  return (
    <View className="w-full">
      <View
        className="flex-row bg-[#f8f9fa] items-center w-[60%]  h-12 
        mb-3
        rounded-full gap-3 px-4"
      >
        <Feather name={iconName} size={size} color={color} />
        <TextInput className="bg-slate-100 w-full " {...rest} />
      </View>
    </View>
  );
}
