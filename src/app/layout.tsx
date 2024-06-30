import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Vigil",
	description: "Monitor your website's uptime and performance.",
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={font.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
