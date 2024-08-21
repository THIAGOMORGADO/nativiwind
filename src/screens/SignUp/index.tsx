import React, { useReducer } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Controller, useForm, type Control } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Header from "../../components/Header";

import { useNavigation } from "@react-navigation/native";
import type { RootParamsScreen } from "../../types/Navigation";

type FormState = {
  isSubmitting: boolean;
};

type FormAction = { type: "SUBMITTING" } | { type: "SUBMITTED" };

interface FormData {
  firstName: string;
  password: string;
  email: string;
  phoneNumber: string;
}

const initialState: FormState = {
  isSubmitting: false,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SUBMITTING":
      return { ...state, isSubmitting: true };
    case "SUBMITTED":
      return { ...state, isSubmitting: false };
    default:
      return state;
  }
};
const schema = yup.object().shape({
  firstName: yup.string().required("Nome é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "A senha precisa ter no mínimo 6 caracteres"),
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  phoneNumber: yup
    .string()
    .min(13, "O Numero precisa conter 13 caracteres")
    .required("Número de telefone é obrigatório"),
});

export default function SignUp() {
  const navigation = useNavigation<RootParamsScreen>();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      password: "",
      email: "",
      phoneNumber: "",
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

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('newUser')
  //     if(value !== null) {
  //       console.log("Aqui estamos trazendo os dados do localstorage", value)
  //     }
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }
  // getData()

  return (
    <>
      <Header pageName="SignUp" />
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <View className="bg-slate-500 flex-1 items-center justify-center w-full">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ padding: 20, marginTop: 40 }}
          >
            <Controller
              control={control as Control<FormData>}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  iconName="user"
                  size={20}
                  color="#ff0000"
                  placeholder="Digite seu nome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className=""
                />
              )}
              name="firstName"
            />
            {errors.firstName && (
              <Text className="mb-5">This is required.</Text>
            )}

            <Controller
              control={control as Control<FormData>}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  iconName="mail"
                  size={20}
                  color="#ff0000"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite seu nome"
                />
              )}
              name="email"
            />
            {errors.firstName && (
              <Text className="mb-5">This is required.</Text>
            )}

            <Controller
              control={control as Control<FormData>}
              rules={{
                required: true,
                maxLength: 6,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  iconName="key"
                  size={20}
                  color="#ff0000"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite sua senha"
                />
              )}
              name="password"
            />
            {errors.password && <Text className="mb-5">This is required.</Text>}

            <Controller
              control={control as Control<FormData>}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  iconName="phone"
                  size={20}
                  color="#ff0000"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite seu email"
                />
              )}
              name="phoneNumber"
            />
            {errors.phoneNumber && (
              <Text className="mb-5">This is required.</Text>
            )}

            <View>
              <Button
                title={state.isSubmitting ? "Submitting" : "Submit"}
                onPress={handleSubmit(onSubmit)}
                className="bg-zinc-800 p-5 rounded-full items-center justify-center mt-10"
                Size
              >
                <Text className="text-white font-bold">Fazer o Cadastro</Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableNativeFeedback>
    </>
  );
}
