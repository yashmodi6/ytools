/**
 * @file Header.tsx
 * @description
 * Displays the top header containing a title and optional action icons.
 * Back icon automatically routes to previous screen.
 * Settings icon automatically routes to settings page.
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

/**
 * Props for the `Header` component.
 */
interface HeaderProps {
  /** Header title text */
  title: string;

  /** Optional callback triggered when search icon is pressed */
  onSearch?: () => void;

  /** Toggle: show back icon */
  showBack?: boolean;

  /** Toggle: show search icon */
  showSearch?: boolean;

  /** Toggle: show settings icon */
  showSettings?: boolean;
}

/**
 * Renders a top application header featuring:
 * - Optional back button → auto navigates
 * - Title text
 * - Optional search & settings action
 *
 * @param props Component configuration
 * @returns A header UI section
 */
export default function Header({
  title,
  onSearch,
  showBack = false,
  showSearch = false,
  showSettings = false,
}: HeaderProps) {
  return (
    <SafeAreaView
      edges={['top']}
      className="bg-surface"
      style={{
        minHeight: 64,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 5,
        elevation: 4,
      }}>
      <View className="h-14 flex-row items-center justify-between px-4">
        {/* Left side area */}
        <View className="flex-row items-center">
          {showBack && (
            <TouchableOpacity onPress={() => router.back()} hitSlop={10} className="p-1.5">
              <Ionicons name="chevron-back" className="text-[24px] text-icon-primary" />
            </TouchableOpacity>
          )}

          <Text className="px-1 text-[22px] font-semibold text-text-primary" numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Right side area */}
        <View className="flex-row items-center">
          {showSearch && (
            <TouchableOpacity onPress={onSearch} hitSlop={10} className="p-1.5">
              <Ionicons name="search-outline" className="text-[24px] text-icon-primary" />
            </TouchableOpacity>
          )}

          {showSettings && (
            <TouchableOpacity
              onPress={() => router.push('/settings')}
              hitSlop={10}
              className="ml-2 p-1.5">
              <Ionicons name="settings-outline" className="text-[24px] text-icon-primary" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
