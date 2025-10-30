/**
 * @file SearchModal.tsx
 * @description
 * Bottom-sheet modal that allows users to search and select tools.
 * Displays a query input, a filtered tool list, and invokes handlers
 * when items are selected or the sheet is dismissed.
 */

import React, { useCallback, useMemo } from 'react';
import { Text, TextInput, View, TouchableOpacity, FlatList, useColorScheme } from 'react-native';

import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Easing } from 'react-native-reanimated';

import type { Tool } from '../types/tool';
import { useSearchFilteredToolList } from '../hooks/useSearchFilteredToolList';
import { useBottomSheetVisibility } from '../hooks/useBottomSheetVisibility';
import { HighlightText } from '@/components/ui/HighlightText';

/* ---------------------------------------------
 ✅ Types
----------------------------------------------*/
interface Props {
  /** Controls modal visibility */
  visible: boolean;

  /** Triggered when modal is dismissed */
  onClose: () => void;

  /** Called when user selects a tool */
  onSelect: (tool: Tool & { category?: string; color?: string }) => void;
}

/* ---------------------------------------------
 ✅ Component
----------------------------------------------*/

/**
 * Displays a searchable tool list inside a bottom-sheet modal.
 * - Responsive to theme
 * - Filters tool collection via text keyword
 * - Notifies parent when a tool is selected
 *
 * @param props Visibility + callbacks
 * @returns Bottom sheet modal UI
 */
export default function SearchModal({ visible, onClose, onSelect }: Props) {
  const isDark = useColorScheme() === 'dark';

  const snapPoints = useMemo(() => ['75%', '92%'], []);

  /** Tool query + filtered results */
  const { query, setQuery, filteredTools } = useSearchFilteredToolList('');

  /** Controls sheet open/close state */
  const { bottomSheetRef, handleSheetChange } = useBottomSheetVisibility({
    visible,
    onClose,
  });

  /** Handles user selecting a tool */
  const handleSelect = useCallback(
    (tool: Tool & { category?: string; color?: string }) => {
      onClose();
      onSelect(tool);
    },
    [onClose, onSelect]
  );

  /** Bottom-sheet backdrop layer */
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.45}
      />
    ),
    []
  );

  /* ---------------------------------------------
    ✅ Item Renderer
  ----------------------------------------------*/
  const renderItem = useCallback(
    ({ item }: { item: Tool & { category?: string; color?: string; icon?: string } }) => (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        className={`flex-row items-center border-b py-3 ${
          isDark ? 'border-zinc-800' : 'border-gray-200'
        }`}>
        <View className={`mr-4 rounded-xl p-3 ${item.color}`}>
          <MaterialIcons name={item.icon} size={22} color="white" />
        </View>

        <View className="flex-shrink">
          <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            <HighlightText text={item.name} query={query} />
          </Text>

          <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <HighlightText text={item.category ?? ''} query={query} />
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [query, handleSelect, isDark]
  );

  /* ---------------------------------------------
    ✅ Render
  ----------------------------------------------*/
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enablePanDownToClose
      enableOverDrag
      backdropComponent={renderBackdrop}
      animationConfigs={{
        duration: 240,
        easing: Easing.out(Easing.cubic),
      }}
      backgroundStyle={{
        backgroundColor: isDark ? '#1C1C1E' : '#FAFAFA',
        borderRadius: 22,

        shadowColor: '#000',
        shadowOpacity: 0.22,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: -6 },

        elevation: 35,
      }}
      handleIndicatorStyle={{
        backgroundColor: isDark ? '#707070' : '#D4D4D8',
        width: 40,
      }}>
      <BottomSheetView className="min-h-full flex-1 px-4 pt-4">
        {/* 🔎 SEARCH BAR */}
        <View
          className={`mb-4 flex-row items-center rounded-2xl px-4 py-3 ${
            isDark ? 'bg-zinc-800' : 'bg-gray-100'
          }`}>
          <Ionicons name="search-outline" size={22} color={isDark ? 'white' : 'black'} />

          <TextInput
            placeholder="Search tools..."
            placeholderTextColor={isDark ? '#999' : '#666'}
            value={query}
            onChangeText={setQuery}
            className={`ml-3 flex-1 text-base ${isDark ? 'text-white' : 'text-black'}`}
          />

          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
        </View>

        {/* ✅ Tool Results */}
        <FlatList
          data={filteredTools}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          maxToRenderPerBatch={12}
          windowSize={8}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={() => (
            <Text className={`py-6 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No tools found
            </Text>
          )}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
}
