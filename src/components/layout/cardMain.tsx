type CardMainProps = {
  children: React.ReactNode;
};

export function CardMain({ children }: CardMainProps) {
  return (
    <main className=" border rounded-3xl border-secondary-light/20 bg-white p-8 flex-1 overflow-hidden">
      {children}
    </main>
  );
}
