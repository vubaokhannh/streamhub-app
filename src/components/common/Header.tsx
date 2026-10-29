import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/hooks';
import { Spacing, Typography } from '@/constants/theme';

interface HeaderProps extends ViewProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export function Header({ title, subtitle, rightAction, style, ...rest }: HeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>{subtitle}</Text>
        ) : null}
      </View>
      {rightAction ? <View style={styles.action}>{rightAction}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    marginTop: 2,
  },
  action: {
    marginLeft: Spacing.md,
  },
});
