import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import FileUpload from './pages/FileUpload';
import MediaPlans from './pages/MediaPlans';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary scope="root">
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route
                path="/"
                element={
                  <ErrorBoundary scope="Dashboard">
                    <Dashboard />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/chat"
                element={
                  <ErrorBoundary scope="Chat">
                    <Chat />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/files"
                element={
                  <ErrorBoundary scope="Files">
                    <FileUpload />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/plans"
                element={
                  <ErrorBoundary scope="Plans">
                    <MediaPlans />
                  </ErrorBoundary>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ErrorBoundary>
  );
}
