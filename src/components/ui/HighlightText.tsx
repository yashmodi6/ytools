/**
 * @file HighlightText.tsx
 * @purpose Renders text where a queried substring is visually highlighted.
 * Matching is case-insensitive and ignores whitespace, ensuring that
 * `"Map Tools"` correctly highlights against `"maptools"`.
 */

import React from 'react';
import { Text, useColorScheme } from 'react-native';

interface HighlightTextProps {
  /** Full source text that may contain the query */
  text: string;
  /** Search query to highlight if matched */
  query: string;
}

/**
 * Highlights a matched query within text. If the query is found, only the
 * matching segment is styled with a highlight background. If not found,
 * original text is rendered unchanged.
 *
 * @param props Display text and query value.
 * @returns Formatted text with optional highlight.
 */
export function HighlightText({ text, query }: HighlightTextProps) {
  const isDark = useColorScheme() === 'dark';

  /** Renders plain text when no search query is provided */
  if (!query) return <Text>{text}</Text>;

  const normText = text.toLowerCase().replace(/\s+/g, '');
  const normQuery = query.toLowerCase().replace(/\s+/g, '');

  /** If no normalized match occurs, return original text */
  if (!normText.includes(normQuery)) {
    return <Text>{text}</Text>;
  }

  /** Finds the index where the normalized query begins */
  const matchIndex = normText.indexOf(normQuery);

  /** Finds the matching index within the original string */
  const originalIndex = (() => {
    let flatPos = 0;
    for (let i = 0; i < text.length; i++) {
      if (!/\s/.test(text[i])) {
        if (flatPos === matchIndex) return i;
        flatPos++;
      }
    }
    return -1;
  })();

  /** Determines the end of the matched region in original text */
  const originalEndIndex = (() => {
    let flatPos = 0;
    for (let i = 0; i < text.length; i++) {
      if (!/\s/.test(text[i])) {
        if (flatPos === matchIndex + normQuery.length - 1) return i + 1;
        flatPos++;
      }
    }
    return text.length;
  })();

  const before = text.slice(0, originalIndex);
  const highlight = text.slice(originalIndex, originalEndIndex);
  const after = text.slice(originalEndIndex);

  return (
    <Text>
      <Text>{before}</Text>

      {/* Highlighted match */}
      <Text
        style={{
          backgroundColor: isDark ? '#FACC1544' : '#FFF59E',
          borderRadius: 4,
          paddingHorizontal: 2,
          overflow: 'hidden',
        }}>
        {highlight}
      </Text>

      <Text>{after}</Text>
    </Text>
  );
}
