import WallyWalletShell from "./_components/WallyWalletShell";

export const metadata = {
  title: "Wally Wallet Lab — TokenTap",
  description: "Wally wallet skin playground (isolated layout).",
};

export default function WallyWalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WallyWalletShell>{children}</WallyWalletShell>;
}