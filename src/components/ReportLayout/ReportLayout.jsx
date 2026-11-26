import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useReport } from '../../context/ReportContext.jsx';
import { pathForView, viewFromPath } from '../../utils/route.js';
import { resolveView } from '../../utils/view.js';
import { AppHeader } from '../AppHeader/AppHeader.jsx';
import styles from './ReportLayout.module.less';

export function ReportLayout() {
  const { report, reset } = useReport();
  const location = useLocation();
  const navigate = useNavigate();
  const viewState = viewFromPath(location.pathname);
  const view = resolveView(report, viewState);

  const handleNavigate = (next) => {
    navigate(pathForView(next));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    reset();
    navigate('/');
  };

  return (
    <div className={styles.appShell}>
      <AppHeader
        report={report}
        view={view}
        onNavigate={handleNavigate}
        onReset={handleReset}
      />
      <main className={styles.pageBody}>
        <Outlet />
      </main>
    </div>
  );
}
