import './App.css'
import "./styles/globals.css";
import { ReviewDashboard } from './components/ReviewDashboard';
import { ToastProvider } from './components/base/toast/toast';

function App() {
  return (
    <ToastProvider>
      <main className="flex-1 w-full p-4 sm:p-6 md:p-8 flex flex-col justify-start">
        <div className="mb-6 text-left">
        </div>
        <ReviewDashboard />
      </main>
    </ToastProvider>
  )
}

export default App;
