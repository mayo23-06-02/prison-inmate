import { cn } from "@/utils/cn";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { Typography } from "./Typography";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secure?: boolean;
  containerClassName?: string;
  inputContainerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  secure = false,
  containerClassName = "",
  inputContainerClassName = "",
  className = "",
  editable = true,
  ...props
}) => {
  const [isSecureVisible, setIsSecureVisible] = useState(!secure);
  const [isFocused, setIsFocused] = useState(false);

  const toggleSecure = () => setIsSecureVisible(!isSecureVisible);

  return (
    <View className={cn("w-full mb-4", containerClassName)}>
      {label && (
        <Typography variant="label" className="text-gray-700 mb-1">
          {label}
        </Typography>
      )}
      <View
        className={cn(
          "flex-row items-center border rounded-lg px-4 py-3 bg-white",
          error
            ? "border-red-500"
            : isFocused
              ? "border-primary-500"
              : "border-gray-200",
          !editable && "bg-gray-100",
          inputContainerClassName,
        )}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        <TextInput
          className={cn("flex-1 text-gray-900 text-base p-0", className)}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secure && !isSecureVisible}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          editable={editable}
          {...props}
        />
        {secure && (
          <TouchableOpacity
            onPress={toggleSecure}
            className="ml-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {isSecureVisible ? (
              <EyeOff size={20} color="#6B7280" />
            ) : (
              <Eye size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        )}
        {rightIcon && !secure && <View className="ml-2">{rightIcon}</View>}
      </View>
      {error && (
        <Typography variant="caption" className="text-red-500 mt-1">
          {error}
        </Typography>
      )}
      {helper && !error && (
        <Typography variant="caption" className="text-gray-500 mt-1">
          {helper}
        </Typography>
      )}
    </View>
  );
};

// Simplified version: we can implement a custom picker later
export const PhoneInput: React.FC<InputProps> = (props) => {
  return (
    <View className="mb-4">
      {props.label && (
        <Typography variant="label" className="text-gray-700 mb-1">
          {props.label}
        </Typography>
      )}
      <View className="flex-row items-stretch">
        <View className="bg-gray-100 rounded-l-lg px-4 py-3 border border-r-0 border-gray-200 justify-center">
          <Typography variant="body-md" className="text-gray-700 font-bold">
            +268
          </Typography>
        </View>
        <Input
          {...props}
          label={undefined} // label handled above
          containerClassName="flex-1 mb-0"
          inputContainerClassName="rounded-l-none border-l-0"
          placeholder="7600 0000"
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
};
