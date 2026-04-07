import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import FileUpload from './pages/FileUpload';
import MediaPlans from './pages/MediaPlans';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/files" element={<FileUpload />} />
          <Route path="/plans" element={<MediaPlans />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
