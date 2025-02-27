import Header from "../layout/Header";
import Footer from "../layout/Footer";

function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full py-8 px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Template;
