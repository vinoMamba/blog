import { Inter } from "next/font/google";
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import "./globals.css";
import { cn } from "@/lib/utils";
import { Particle } from "@/components/particles";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={cn(inter.className, " overflow-x-hidden")}>
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
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
