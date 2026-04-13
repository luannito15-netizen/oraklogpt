import type { Metadata } from "next";
import { Anton, Montserrat } from "next/font/google";
import { cookies } from "next/headers";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("oraklo-theme")?.value === "light" ? "light" : "dark";

  return (
    <html
      lang="pt-BR"
      data-theme={theme}
      suppressHydrationWarning
      className={`${anton.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
