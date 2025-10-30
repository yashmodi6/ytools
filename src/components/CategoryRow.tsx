/**
 * @file CategoryRow.tsx
 * @purpose Displays a category section containing its title, icon,
 * and a horizontally scrolling list of tools. Each tool can be selected
 * to trigger navigation or additional actions.
 */

import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, useColorScheme } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import ToolCard from './ToolCard';
import type { Tool } from '../types/tool';
import type { Category } from '../types/category';

type CategoryRowProps = {
  /** Category model containing icon, color, label, and tools */
  category: Category;

  /**
   * Handler invoked when a tool is selected.
   * Provides category + color for context.
   */
  onToolPress: (tool: Tool & { category: string; color: string }) => void;
};

/**
 * Renders a single category row which includes:
 * - Category title + icon
 * - Right arrow indicator
 * - Horizontal tool list
 *
 * Each tool is rendered using `ToolCard` and standardized height
 * is shared across cards for consistent layout.
 *
 * @param props Category data + press handler
 * @returns A category section UI block
 */
export default function CategoryRow({ category, onToolPress }: CategoryRowProps) {
  const isDark = useColorScheme() === 'dark';

  /** Maintains tallest ToolCard height for layout consistency */
  const [maxHeight, setMaxHeight] = useState<number>(0);

  /**
   * Tracks maximum card height so all cards align visually.
   *
   * @param h Height reported by a card
   */
  const handleHeight = useCallback((h: number) => {
    setMaxHeight((prev) => (h > prev ? h : prev));
  }, []);

  return (
    <View className="mb-6">
      {/* Category heading */}
      <View className="mb-3 flex-row items-center justify-between px-5">
        <View className="flex-row items-center">
          <Ionicons name={category.icon} size={22} color={isDark ? 'white' : 'black'} />

          <Text className={`ml-2 text-lg font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            {category.title}
          </Text>
        </View>

        <Feather name="chevron-right" size={22} color="gray" />
      </View>

      <FlatList
        data={category.tools}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        renderItem={({ item }) => (
          <ToolCard
            tool={{
              ...item,
              category: category.title,
              color: category.color,
            }}
            onPress={() =>
              onToolPress({
                ...item,
                category: category.title,
                color: category.color,
              })
            }
            maxHeight={maxHeight}
            onMeasuredHeight={handleHeight}
          />
        )}
      />
    </View>
  );
}
