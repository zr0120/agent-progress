import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ReportLayout } from '../components/ReportLayout/ReportLayout.jsx';
import { ReportProvider, useReport } from '../context/ReportContext.jsx';
import { AgentDetailPage } from '../pages/AgentDetailPage/AgentDetailPage.jsx';
import { AgentListPage } from '../pages/AgentListPage/AgentListPage.jsx';
import { DomainPage } from '../pages/DomainPage/DomainPage.jsx';
import { SubdomainPage } from '../pages/SubdomainPage/SubdomainPage.jsx';
import { UploadPage } from '../pages/UploadPage/UploadPage.jsx';

function ReportGuard({ children }) {
  const { report } = useReport();

  if (!report) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function AppRouter() {
  return (
    <HashRouter>
      <ReportProvider>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route
            element={
              <ReportGuard>
                <ReportLayout />
              </ReportGuard>
            }
          >
            <Route path="/domain" element={<DomainPage />} />
            <Route path="/domain/:domainId" element={<SubdomainPage />} />
            <Route
              path="/domain/:domainId/subdomain/:subdomainId"
              element={<AgentListPage />}
            />
            <Route
              path="/domain/:domainId/subdomain/:subdomainId/agent/:agentId"
              element={<AgentDetailPage />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ReportProvider>
    </HashRouter>
  );
}
