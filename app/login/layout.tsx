export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen flex items-center justify-center">
            {children}
        </div>
    )
}