import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, HeaderProps } from './Header';
import { Footer, FooterProps, BottomTabKey } from './Footer';
import { useTheme } from '@/hooks';

export interface MainLayoutProps {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  customHeader?: React.ReactNode;
  hideHeader?: boolean;
  footerProps?: FooterProps;
  customFooter?: React.ReactNode;
  hideFooter?: boolean;
  activeTab?: BottomTabKey;
  onTabChange?: (tab: BottomTabKey) => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export function MainLayout({
  children,
  headerProps,
  customHeader,
  hideHeader = false,
  footerProps,
  customFooter,
  hideFooter = false,
  activeTab = 'home',
  onTabChange,
  style,
  contentStyle,
}: MainLayoutProps) {
  const { theme, isDark } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }, style]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      {!hideHeader ? (
        customHeader ? (
          customHeader
        ) : (
          <Header {...headerProps} />
        )
      ) : null}

      {/* Main Page Content */}
      <View style={[styles.content, contentStyle]}>{children}</View>

      {/* Footer / Bottom Navigation */}
      {!hideFooter ? (
        customFooter ? (
          customFooter
        ) : (
          <Footer
            activeTab={activeTab}
            onTabChange={onTabChange}
            {...footerProps}
          />
        )
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
