import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ImportSection from "./ImportSection";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="space-y-8 p-8">
          <ImportSection />
        </main>
      </div>
    </div>
  );
}