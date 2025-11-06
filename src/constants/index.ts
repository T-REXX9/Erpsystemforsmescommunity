export * from './menu';

// Animation configurations
export const ANIMATION_CONFIG = {
  stagger: {
    delay: 0.05,
    duration: 0.3,
  },
  menuItem: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  subMenuItem: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  },
  header: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  },
  logo: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { delay: 0.1, type: 'spring', stiffness: 200 },
  },
  iconHover: {
    whileHover: { scale: 1.1, rotate: 5 },
    transition: { type: 'spring', stiffness: 400 },
  },
  chevron: {
    transition: { duration: 0.2 },
  },
  footer: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.4, duration: 0.3 },
  },
  button: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  },
};

// App configuration
export const APP_CONFIG = {
  name: 'ERP System',
  tagline: 'Enterprise Solution',
  version: '1.0.0',
};

// Design System - Typography
export const TYPOGRAPHY = {
  // Page Headers
  pageTitle: 'text-3xl font-bold tracking-tight',
  pageSubtitle: 'text-sm text-muted-foreground',

  // Section Headers
  sectionTitle: 'text-xl font-semibold',
  sectionSubtitle: 'text-sm text-muted-foreground',

  // Card Headers
  cardTitle: 'text-lg font-semibold',
  cardSubtitle: 'text-sm text-muted-foreground',

  // Stats/Metrics
  metricValue: 'text-2xl font-bold',
  metricLabel: 'text-sm font-medium text-muted-foreground',
  metricChange: 'text-xs text-muted-foreground',

  // Table
  tableHeader: 'text-sm font-medium',
  tableCell: 'text-sm',
  tableCellBold: 'text-sm font-medium',

  // Body Text
  body: 'text-sm',
  bodySmall: 'text-xs',
  bodyLarge: 'text-base',

  // Labels
  label: 'text-sm font-medium',
  labelSmall: 'text-xs font-medium',

  // Menu Hierarchy - 3 Levels
  menuLevel1: 'text-sm font-bold',           // Top-level (WAREHOUSE, SALES, etc.) - Bold & Largest
  menuLevel2: 'text-sm font-semibold',       // Second-level (INVENTORY, PURCHASING, etc.) - Semi-bold & Medium
  menuLevel3: 'text-xs font-normal',         // Third-level (Stock Movement, etc.) - Regular & Small
};

// Design System - Icon Sizes
export const ICON_SIZES = {
  // Page level
  pageHeader: 'h-6 w-6',

  // Section level
  sectionHeader: 'h-5 w-5',

  // Card level
  cardHeader: 'h-5 w-5',

  // Buttons
  buttonLarge: 'h-5 w-5',
  buttonDefault: 'h-4 w-4',
  buttonSmall: 'h-3.5 w-3.5',

  // Menu/Navigation - 3 Level Hierarchy
  menuLevel1: 'h-5 w-5',      // Top-level (WAREHOUSE, SALES, etc.) - Largest
  menuLevel2: 'h-4 w-4',      // Second-level (INVENTORY, PURCHASING, etc.) - Medium
  menuLevel3: 'h-3.5 w-3.5',  // Third-level (Stock Movement, etc.) - Small
  menuChevron: 'h-4 w-4',     // Chevron icons

  // Table actions
  tableAction: 'h-4 w-4',

  // Status indicators
  statusIcon: 'h-4 w-4',
  statusIconSmall: 'h-3 w-3',

  // Stats/Metrics
  metricIcon: 'h-4 w-4',
};

// Design System - Spacing
export const SPACING = {
  pageContainer: 'p-6 space-y-6',
  sectionContainer: 'space-y-4',
  cardPadding: 'p-6',
  cardHeaderPadding: 'pb-3',
  gridGap: 'gap-4',
  gridGapLarge: 'gap-6',
};
