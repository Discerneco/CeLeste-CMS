// Import the @tailwindcss/postcss package for Tailwind CSS v4
import tailwindcssPlugin from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcssPlugin,
    autoprefixer,
  ],
};
