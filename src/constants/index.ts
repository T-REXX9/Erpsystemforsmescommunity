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
