import TodosList from "./TodosList";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex">
            <div>
                <TodosList />
            </div>

            <div className="flex-1">{children}</div>
            {/* children eats page.tsx */}

        </main>
      </body>
    </html>
  );
}
