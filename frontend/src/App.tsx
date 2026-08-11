import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReportDetailPage } from './features/report-detail/ReportDetailPage';
import { ReportsLandingPage } from './features/reports-landing/ReportsLandingPage';
import { AppLayout } from './shared/components/layout';
import { NotFoundPage } from './shared/components/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<ReportsLandingPage />} />
          <Route path="/reports/:reportId" element={<ReportDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
