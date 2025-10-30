/**
 * @file Header.tsx
 * @description
 * Displays the top application header containing a title and optional
 * action icons. The settings icon is always visible, while the search
 * icon renders only if a handler is provided.
 */

import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

/**
 * Props for the `Header` component.
 */
interface HeaderProps {
  /** Header title text */
  title: string;

  /** Optional callback triggered when search icon is pressed */
  onSearch?: () => void;

  /** Callback triggered when settings icon is pressed (always visible) */
  onSettings?: () => void;
}

/**
 * Renders a top application header featuring:
 * - Title text
 * - Always-visible settings button
 * - Optional searchable action
 *
 * @param props Component configuration
 * @returns A header UI section
 */
export default function Header({ title, onSearch, onSettings }: HeaderProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      edges={['top']}
      className={isDark ? 'bg-zinc-900' : 'bg-white'}
      style={{
        minHeight: 64,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 5,
        elevation: 4,
      }}>
      <View className="h-14 flex-row items-center justify-between px-4">
        <Text
          className={`px-1 text-[22px] font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}
          numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center">
          {onSearch && (
            <TouchableOpacity onPress={onSearch} hitSlop={10} className="p-1.5">
              <Ionicons name="search-outline" size={24} color={isDark ? 'white' : 'black'} />
            </TouchableOpacity>
          )}

          {/* ✅ Always show settings */}
          <TouchableOpacity onPress={onSettings} hitSlop={10} className="ml-2 p-1.5">
            <Ionicons name="settings-outline" size={24} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
