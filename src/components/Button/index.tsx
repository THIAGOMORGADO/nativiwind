import { Children } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from "react-native";

type ButtonProps = {
  title?: string;
  onPress: () => void;
  className: string;
  children?: React.ReactNode;
  Size?: Boolean;
};

export default function Button({
  title,
  onPress,
  className,
  Size,
  children,
  ...rest
}: ButtonProps) {
  return (
    <>
      <TouchableOpacity
        className={`${Size ? className : className}`}
        onPress={onPress}
        {...rest}
      >
        {children}
      </TouchableOpacity>
    </>
  );
}
