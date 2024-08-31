import { TopNav } from "@/components/nav";

export default function HomtLayout({ children }) {
  return (
    <main className=" max-w-screen-md mx-auto h-screen">
      <TopNav />
      <div className="mt-6 px-4 md:px-0">
        {children}
      </div>
    </main>
  )
}
