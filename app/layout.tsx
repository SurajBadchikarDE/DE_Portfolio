import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suraj Badchikar | Azure Data Engineer Portfolio",
  description: "Explore the modern cloud data pipeline. Scale data architecture with Azure, Databricks, Microsoft Fabric, and Snowflake. Portfolio of Suraj Badchikar, Azure Data Engineer.",
  keywords: [
    "Suraj Badchikar",
    "Data Engineer",
    "Azure Data Engineer",
    "Databricks",
    "Microsoft Fabric",
    "Snowflake",
    "Medallion Architecture",
    "PySpark",
    "Spark SQL",
    "Data Pipelines",
  ],
  authors: [{ name: "Suraj Badchikar" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="bg-[#050816] text-white">
        {children}
      </body>
    </html>
  );
}
