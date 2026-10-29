import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@/hooks';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  style,
  textStyle,
  ...rest
}: ButtonProps) {
  const { theme } = useTheme();

  const getContainerStyle = (): ViewStyle => {
    let backgroundColor = theme.primary;
    let borderColor = 'transparent';
    let borderWidth = 0;

    if (variant === 'secondary') {
      backgroundColor = theme.primaryLight;
    } else if (variant === 'outline') {
      backgroundColor = 'transparent';
      borderColor = theme.border;
      borderWidth = 1;
    }

    const paddingVertical =
      size === 'sm' ? Spacing.xs : size === 'lg' ? Spacing.md : Spacing.sm + 2;
    const paddingHorizontal =
      size === 'sm' ? Spacing.sm : size === 'lg' ? Spacing.lg : Spacing.md;

    return {
      backgroundColor,
      borderColor,
      borderWidth,
      paddingVertical,
      paddingHorizontal,
      opacity: disabled || loading ? 0.6 : 1,
    };
  };

  const getTextColor = (): string => {
    if (variant === 'primary') return '#FFFFFF';
    if (variant === 'secondary') return theme.primary;
    return theme.text;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled || loading}
      style={[styles.base, getContainerStyle(), style]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: getTextColor(), fontSize: size === 'sm' ? Typography.size.sm : Typography.size.md },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: Typography.weight.semibold,
  },
});
