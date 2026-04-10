import type { Metadata } from "next";
import { Anton, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ORAKLO",
    template: "%s | ORAKLO",
  },
  description:
    "Plataforma de previsoes sobre eventos reais, com foco em clareza, racionalidade e validacao objetiva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${anton.variable} ${montserrat.variable} h-full antialiased`}>
      <head>
        {/* Set theme before first paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('oraklo-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
