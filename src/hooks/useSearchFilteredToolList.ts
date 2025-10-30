/**
 * @file useSearchFilteredToolList.ts
 * @description
 * Provides a searchable flat list of categorized tools.
 * Exposes query state, debounced value, filtered results, and utilities.
 */

import { useEffect, useMemo, useState } from 'react';
import type { Tool } from '../types/tool';
import { categoriesStatic } from '../data/categories';

/**
 * Tool type enhanced with category + display color.
 */
export type EnrichedTool = Tool & {
  category?: string;
  color?: string;
};

/**
 * Returns a debounced version of a given value.
 * Useful for throttling search input.
 */
function useDebouncedValue<T>(value: T, delay = 180) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

/**
 * Builds a flattened tool list enriched with category + color.
 * Accepts a base query string and returns:
 * - Query + setter
 * - Debounced query
 * - Filtered tool results
 * - Full enriched tool list
 */
export function useSearchFilteredToolList(initialQuery = '') {
  /** Current search query */
  const [query, setQuery] = useState(initialQuery);

  /** Debounced search text */
  const debouncedQuery = useDebouncedValue(query);

  /** Full enriched tool list (flat categories) */
  const tools = useMemo<EnrichedTool[]>(
    () =>
      categoriesStatic.flatMap((c) =>
        c.tools.map((t) => ({
          ...t,
          category: c.title,
          color: c.color,
        }))
      ),
    []
  );

  /**
   * Tools matching search query.
   * Name + category are matched ignoring whitespace + case.
   */
  const filteredTools = useMemo(() => {
    if (!debouncedQuery) return tools;

    const q = debouncedQuery.toLowerCase().replace(/\s+/g, '');

    return tools.filter((t) => {
      const name = t.name.toLowerCase().replace(/\s+/g, '');
      const category = (t.category ?? '').toLowerCase().replace(/\s+/g, '');
      return name.includes(q) || category.includes(q);
    });
  }, [debouncedQuery, tools]);

  /** Resets query to empty */
  const resetQuery = () => setQuery('');

  return {
    /** Raw input text */
    query,

    /** Setter for input text */
    setQuery,

    /** Reset search text */
    resetQuery,

    /** Debounced input */
    debouncedQuery,

    /** Search-filtered tools */
    filteredTools,

    /** All enriched tools */
    allTools: tools,
  };
}
