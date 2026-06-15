import './App.css'
import "./styles/globals.css";
import { ReviewDashboard } from './components/ReviewDashboard';
import { ToastProvider } from './components/base/toast/toast';
import { PageBreadcrumb } from './components/PageBreadcrumb';
import { UserHeader } from './components/UserHeader';

function App() {
  return (
    <ToastProvider>
      <main className="flex-1 w-full p-4 sm:p-6 md:p-8 flex flex-col justify-start">
        <PageBreadcrumb />
        <div className="flex flex-col gap-4 mb-4">
          <UserHeader />
        </div>
        <ReviewDashboard />
      </main>
    </ToastProvider>
  )
}

export default App;
