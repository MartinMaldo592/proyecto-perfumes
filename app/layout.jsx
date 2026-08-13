import './globals.css';
import { StoreProvider } from '../src/context/StoreContext';

export const metadata = {
  title: 'OUD AL-ASIL — Tienda Oficial de Perfumería Fina',
  description: 'Catálogo y tienda virtual especializada en perfumería y cosmética de lujo 100% auténtica.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
