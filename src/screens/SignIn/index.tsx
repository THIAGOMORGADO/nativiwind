import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Controller, useForm, type Control } from "react-hook-form";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { RootParamsScreen } from "../../types/Navigation";
import { useReducer } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormState {
  isSubmitting: boolean;
}

type FormAction = { type: "SUBMITTING" } | { type: "SUBMITTED" };

interface FormData {
  email: string;
  password: string;
}

const initialState: FormState = {
  isSubmitting: false,
};

const formReduce = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SUBMITTING":
      return { isSubmitting: true };
    case "SUBMITTED":
      return { isSubmitting: false };
    default:
      return state;
  }
};
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function SignIn() {
  const [state, dispatch] = useReducer(formReduce, initialState);
  const navigation = useNavigation<RootParamsScreen>(); // Add this line
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    schema.validate(data).then(() => {
      if (data) {
        dispatch({ type: "SUBMITTING" });

        setTimeout(
          () => {
            Alert.alert("Form Data", JSON.stringify(data));
            dispatch({ type: "SUBMITTED" });
          },

          2000
        );
      }
      Alert.alert(
        "Dados informado",
        "Revise os campos pois dados nao sao coerente"
      );
    });
  };

  return (
    <>
      <Header pageName="SignIn" />
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          className=" bg-slate-500 items-center justify-center h-[75%] "
          behavior="padding"
        >
          <View className="w-48 h-48 bg-red-400 mb-10 items-center justify-center rounded-full">
            <Text>Logo</Text>
          </View>
          <KeyboardAvoidingView>
            <Controller
              control={control as Control<FormData>}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Digite seu email"
                  iconName="user"
                  size={30}
                  className="mb-20"
                  color="#000"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
              name="email"
            />
            {errors.email && <Text className="mb-5">Email Requirido</Text>}

            <Controller
              control={control as Control<FormData>}
              rules={{
                required: true,
                maxLength: 6,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Digite a senha "
                  iconName="lock"
                  size={30}
                  color="#000"
                  secureTextEntry
                  className="mb-20"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errors.password && <Text className="mb-5">Senha Requirida</Text>}

            <View className="items-center my-4 ">
              <Button
                title={state.isSubmitting ? "Submitting..." : "Submit"}
                onPress={handleSubmit(onSubmit)}
                className="bg-zinc-800 w-[50%] p-2 items-center rounded-full"
              >
                <Text className="text-white">Sign In</Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
      </TouchableNativeFeedback>
      <View className="bg-slate-500 h-screen">
        <Text className=" absolute top-54 left-52 text-xl font-bold text-white">
          Dont have account?
        </Text>
        <Button onPress={handleSubmit(onSubmit)} className="">
          <Text className="absolute top-54 left-80 mt-2 text-xl font-bold text-white mt-6">
            SignIn
          </Text>
        </Button>
      </View>
    </>
  );
}
