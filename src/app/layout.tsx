import "./globals.css";
import routes from "./routes";
import { PageHeader } from "@/components/frame/headers/PageHeader";
import { Navbar } from "@/components/frame/navigation/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="w-full content-center">
        <PageHeader height="48px">
          <div className="w-full h-full flex items-center">
            <Navbar className="h-full" routes={routes}></Navbar>
          </div>
        </PageHeader>
        {children}
      </body>
    </html>
  );
}
