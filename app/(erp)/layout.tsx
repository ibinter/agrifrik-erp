import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import AuthGuard from "../components/AuthGuard";

export default function ErpLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* pb-16 reserves space for BottomNav on mobile; removed on sm+ */}
          <main className="flex-1 overflow-y-auto pb-16 sm:pb-0">
            {children}
          </main>
        </div>
        <BottomNav />
      </div>
    </AuthGuard>
  );
}
