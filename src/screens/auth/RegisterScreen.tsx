import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import Button from "@/src/components/Button";
import Breaker from "@/src/components/Breaker";
import ButtonOutline from "@/src/components/ButtonOutline";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { supabase } from "@/lib/supabase";

const { width, height } = Dimensions.get("window");

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const { navigate: navigateAuth }: NavigationProp<AuthNavigationType> =
    useNavigation();

  async function signUpWithEmail() {
    setIsLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!session) {
      Alert.alert(
        "Registered succesfully. Please check your inbox for verification!"
      );
    }
    if (error) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }
  return (
    <View className="flex-1">
      {isloading && (
        <View className="absolute z-50 h-full w-full justify-center items-center">
          <View
            className="h-full w-full justify-center items-center bg-black opacity-[0.45]
          "
          ></View>
          <View className="absolute">
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      )}

      <View className="justify-center items-center relative flex-1">
        <View
          className="justify-center w-full px-4 space-y-4"
          style={{
            height: height * 0.75,
          }}
        >
          <Animated.View
            className="justify-center items-center"
            entering={FadeInDown.duration(100).springify()}
          >
            <Text
              className="text-neutral-800 text-2xl leading-[60px]"
              style={{
                fontFamily: "PlusJakartaSansBold",
              }}
            >
              Register to join us.
            </Text>
            <Text className="text-neutral-500 text-sm font-medium">
              Welcome! Please enter your details.
            </Text>
          </Animated.View>
          <Animated.View
            className="py-8 space-y-8"
            entering={FadeInDown.duration(100).delay(200).springify()}
          >
            <View className="border-2 border-gray-400 rounded-lg">
              <TextInput
                className="p-4"
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Email"
                placeholderTextColor={"gray"}
                autoCapitalize="none"
              />
            </View>

            <View className="border-2 border-gray-400 rounded-lg">
              <TextInput
                className="p-4"
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Password"
                placeholderTextColor={"gray"}
                autoCapitalize="none"
              />
            </View>
          </Animated.View>
          <Animated.View
            className="w-full justify-start"
            entering={FadeInDown.duration(100).delay(300).springify()}
          >
            <View className="pb-6">
              <Button title={"Register"} action={() => signUpWithEmail()} />
            </View>
          </Animated.View>
          <View>
            <Breaker />
          </View>
          <View className="w-full justify-normal">
            <Animated.View
              entering={FadeInDown.duration(100).delay(600).springify()}
              className="pb-4"
            >
              <ButtonOutline title="Continue with Google">
                <AntDesign name="google" size={20} color="gray" />
              </ButtonOutline>
            </Animated.View>
          </View>
          <Animated.View
            className="flex-row justify-center items-center"
            entering={FadeInDown.duration(100).delay(700).springify()}
          >
            <Text
              className="text-neutral-500 text-lg font-medium leading-[38px]"
              style={{
                fontFamily: "PlusJakartaSansMedium",
              }}
            >
              Have an account?{" "}
            </Text>
            <Pressable onPress={() => navigateAuth("Login")}>
              <Text
                className="text-neutral-800 text-lg font-medium leading-[38px] text-center"
                style={{
                  fontFamily: "PlusJakartaSansBold",
                }}
              >
                Login {""}
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
