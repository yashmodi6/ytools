/**
 * @file ToolCard.tsx
 * @description
 * Renders a single tool card with an icon + label.
 * The card reports its measured height to the parent so layout rows can
 * visually align. Ideal for use in tool grids.
 */

import React, { useRef } from 'react';
import { TouchableOpacity, View, Text, useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import type { Tool } from '../types/tool';

/**
 * Props for <ToolCard />
 */
export type ToolCardProps = {
  /** Tool object to display */
  tool: Tool & {
    /** Tailwind utility class for icon background color */
    color?: string;
    /** Category label (optional) */
    category?: string;
  };

  /** Callback fired when user taps the card */
  onPress: () => void;

  /** Normalized height applied to match sibling ToolCard heights */
  maxHeight: number;

  /** Returns the measured height of the card to parent */
  onMeasuredHeight: (h: number) => void;
};

/** Constant width for each ToolCard */
const CARD_WIDTH = 112;

/**
 * Displays a compact, tappable tool item consisting of:
 * - A circular icon badge
 * - The tool name
 * - Height awareness so parent layouts stay consistent
 */
const ToolCard = React.memo(({ tool, onPress, maxHeight, onMeasuredHeight }: ToolCardProps) => {
  const isDark = useColorScheme() === 'dark';
  const localRef = useRef<View>(null);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      hitSlop={8}
      style={{ width: CARD_WIDTH }}>
      <View
        ref={localRef}
        onLayout={(e) => {
          onMeasuredHeight(e.nativeEvent.layout.height);
        }}
        className={`items-center justify-start rounded-2xl p-4 shadow ${
          isDark ? 'bg-zinc-800 shadow-black/40' : 'bg-gray-100 shadow-gray-400/20'
        }`}
        style={{
          height: maxHeight || undefined,
          shadowRadius: 6,
          elevation: 3,
        }}>
        {/* Icon */}
        <View
          className={`${tool.color ?? 'bg-gray-400'} items-center justify-center rounded-full`}
          style={{ width: 48, height: 48 }}>
          <MaterialIcons name={tool.icon} size={26} color="white" />
        </View>

        {/* Tool name */}
        <Text
          className={`mt-3 text-center text-sm font-medium ${
            isDark ? 'text-white' : 'text-zinc-800'
          }`}
          numberOfLines={3}>
          {tool.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default ToolCard;
