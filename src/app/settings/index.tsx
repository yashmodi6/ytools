// ------------------------------------------------------
// @file index.tsx
// @description Settings screen displaying categorized configuration rows.
// ------------------------------------------------------

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';

type ThemeType = 'system' | 'light' | 'dark';

/**
 * App settings screen.
 * Groups preferences into logical sections such as theme, storage, files, etc.
 */
export default function SettingsScreen() {
  const [theme] = useState<ThemeType>('system');
  const [savePath] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-surface dark:bg-surface">
      <Header title="Settings" showBack />

      <View className="mt-5" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}>
        <SettingsBlock title="Theme">
          <DropdownRow label="App Theme" value={themeLabel(theme)} />
        </SettingsBlock>

        <SettingsBlock title="Storage">
          <DirPickerRow label="Save Location" value={savePath ?? 'Not selected'} />
          <NavRow label="Clear Cache" />
        </SettingsBlock>

        <SettingsBlock title="Files">
          <NavRow label="Auto Rename Rules" />
          <NavRow label="File Naming Pattern" />
        </SettingsBlock>

        <SettingsBlock title="Backup & Restore">
          <NavRow label="Backup Settings" />
          <NavRow label="Restore Settings" />
          <NavRow label="Reset to Defaults" />
        </SettingsBlock>

        <SettingsBlock title="Security">
          <NavRow label="Privacy Controls" />
          <NavRow label="Allow Analytics" />
          <NavRow label="App Lock" />
        </SettingsBlock>

        <SettingsBlock title="Support">
          <NavRow label="Report Issue" />
          <NavRow label="Contact Us" />
          <NavRow label="FAQ" />
          <NavRow label="Rate the App" />
          <NavRow label="Website" />
          <NavRow label="Check for Updates" />
          <NavRow label="Changelog" />
        </SettingsBlock>

        <SettingsBlock title="Legal">
          <NavRow label="Privacy Policy" />
          <NavRow label="Terms of Service" />
          <NavRow label="License" />
        </SettingsBlock>

        <SettingsBlock title="About">
          <InfoRow label="App Version" value="1.0.0" />
          <InfoRow label="Build Number" value="52" />
          <NavRow label="More from YTools" />
        </SettingsBlock>
      </ScrollView>
    </View>
  );
}

/**
 * Maps theme enum to display label.
 */
function themeLabel(value: ThemeType) {
  return value === 'system' ? 'System' : value === 'dark' ? 'Dark' : 'Light';
}

/* ------------------------------------------------------
   UI SUBCOMPONENTS
------------------------------------------------------ */

/**
 * Section block wrapper for grouped rows.
 */
function SettingsBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mb-8">
      <Text className="mb-2 px-1 text-sm font-semibold tracking-wide text-text-secondary">
        {title}
      </Text>

      <View className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
        {children}
      </View>
    </View>
  );
}

/**
 * Base row template used by all row variants.
 */
function RowBase({ children, pressable }: { children: React.ReactNode; pressable?: boolean }) {
  const Comp = pressable ? TouchableOpacity : View;

  return (
    <Comp
      activeOpacity={0.7}
      className="flex-row items-center justify-between border-b border-border px-4 py-4">
      {children}
    </Comp>
  );
}

/**
 * Row with navigation intent.
 */
function NavRow({ label }: { label: string }) {
  return (
    <RowBase pressable>
      <Text className="text-[15px] text-text-primary">{label}</Text>
    </RowBase>
  );
}

/**
 * Static value display row.
 */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <RowBase>
      <Text className="text-[15px] text-text-primary">{label}</Text>
      <Text className="text-sm text-text-secondary">{value}</Text>
    </RowBase>
  );
}

/**
 * Row showing dropdown selection.
 */
function DropdownRow({ label, value }: { label: string; value: string }) {
  return (
    <RowBase pressable>
      <Text className="text-[15px] text-text-primary">{label}</Text>

      <View className="flex-row items-center">
        <Text className="mr-2 text-sm text-text-secondary">{value}</Text>
        <Ionicons name="chevron-down" className="text-[18px] text-icon-secondary" />
      </View>
    </RowBase>
  );
}

/**
 * Row allowing directory path selection.
 */
function DirPickerRow({ label, value }: { label: string; value: string }) {
  return (
    <RowBase pressable>
      <Text className="text-[15px] text-text-primary">{label}</Text>

      <View className="max-w-[150px] flex-row items-center">
        <Text numberOfLines={1} className="mr-2 text-sm text-text-secondary">
          {value}
        </Text>
        <Ionicons name="folder-open" className="text-[18px] text-icon-secondary" />
      </View>
    </RowBase>
  );
}
