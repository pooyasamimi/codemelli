import Header from "./Header";
import Main from "./Main";
import { Toaster } from "./ui/toaster";

const Layout = () => {
  return (
    <div className=" bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        <Main />
      </main>
      <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
        <div className="container mx-auto px-4 text-center dark:text-gray-200">
          <p>Made with 💗 by Pooya Samimi</p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
