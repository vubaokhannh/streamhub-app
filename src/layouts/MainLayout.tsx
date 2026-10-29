import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, HeaderProps } from './Header';
import { Footer, FooterProps, BottomTabKey } from './Footer';
import { StreamHubColors } from '@/constants/theme';

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
  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

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
    backgroundColor: StreamHubColors.background,
  },
  content: {
    flex: 1,
  },
});
