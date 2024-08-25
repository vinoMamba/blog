import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Particle } from "@/components/particles";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={cn(inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Particle />
          <div className="relative z-50 h-screen w-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
