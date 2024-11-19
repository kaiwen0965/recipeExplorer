import MainHeader from '@/components/main-header/main-header';
import './globals.css';

export const metadata = {
  title: 'Recipe Explorer',
  description: 'Explore a world of tasty recipes from a vibrant community of food enthusiasts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
