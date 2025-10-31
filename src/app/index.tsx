/**
 * @file HomeScreen.tsx
 * @description Renders the app's main screen that displays tool categories,
 * provides search access, and allows navigation to individual tool screens.
 */

import React, { useCallback, useState } from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import { useRouter } from 'expo-router';

import Header from '../components/Header';
import SearchModal from '../components/SearchModal';
import CategoryRow from '../components/CategoryRow';
import { categoriesStatic } from '../data/categories';

import type { Tool } from '../types/tool';
import type { Category } from '../types/category';

/**
 * Displays categorized tools and enables interacting with search
 * and tool navigation.
 *
 * @returns The main home screen UI.
 */
export default function HomeScreen() {
  const router = useRouter();

  const [searchVisible, setSearchVisible] = useState(false);

  /**
   * Navigates to the screen for a selected tool.
   *
   * @param tool Tool instance selected by the user
   */
  const handleOpenTool = useCallback(
    (tool: Tool & { category?: string; color?: string }) => {
      router.push({
        pathname: '/tool',
        params: { tool: JSON.stringify(tool) },
      });
    },
    [router]
  );

  /**
   * Renders a category section with its tools.
   *
   * @param item Category instance
   */
  const renderCategory = useCallback(
    ({ item }: { item: Category }) => <CategoryRow category={item} onToolPress={handleOpenTool} />,
    [handleOpenTool]
  );

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <Header title="YTools" onSearch={() => setSearchVisible(true)} />

      {/* Adds space between header and category list */}
      <View className="mt-5" />

      <FlatList
        data={categoriesStatic}
        renderItem={renderCategory}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        onSelect={handleOpenTool}
      />
    </SafeAreaView>
  );
}
