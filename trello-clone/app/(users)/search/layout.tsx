import Search from "./Search";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* This title is specifically for search page only */}
      <head>
        <title>The Search Page</title>
      </head>
      <body>
        <main className="flex space-x-4 divide-x-2 p-5">
          <div>
            <h1>Search</h1>
          </div>
          <div className="flex-1 pl-5">
            <Search />

            <div>{children}</div>
            {/* The rest of the page that will get loaded out of page.tsx */}
          </div>
        </main>
      </body>
    </html>
  );
}
