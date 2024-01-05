import NavBar from "./navbar";


export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
  return (
    <>
    <NavBar />
    {children}
    </>
    )
}