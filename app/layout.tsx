import "./globals.css"; // 1. Import Tailwind styles
import { ThemeProvider } from "./components/ThemeProvider"; // 2. Import your provider

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Everything inside these tags can now use Dark Mode! */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
