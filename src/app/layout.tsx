import PageHeader from "@/components/frame/headers/PageHeader";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full content-center">
        <PageHeader height="48px">
          <div className="w-full h-full border-b">
            <h1 className="text-4xl">PageTitle</h1>
          </div>
        </PageHeader>
        {children}
      </body>
    </html>
  );
}
