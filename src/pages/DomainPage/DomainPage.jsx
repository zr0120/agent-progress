import { useNavigate } from 'react-router-dom';
import { MetricStrip } from '../../components/MetricStrip/MetricStrip.jsx';
import { VoronoiMap } from '../../components/VoronoiMap/VoronoiMap.jsx';
import { useReport } from '../../context/ReportContext.jsx';
import { countDomainAgents } from '../../utils/report.js';
import styles from './DomainPage.module.less';

export function DomainPage() {
  const { report } = useReport();
  const navigate = useNavigate();
  const items = report.domains.map((domain) => ({
    id: domain.id,
    name: domain.name,
    count: countDomainAgents(domain),
    subdomains: domain.subdomains,
    target: domain,
  }));

  return (
    <>
      <MetricStrip report={report} />
      <div className={styles.sectionHeading}>
        <div>
          <h2 className={styles.sectionTitle}>领域全景墙</h2>
          <p className={styles.sectionSubtitle}>当前页面展示领域层，点击领域可查看其下的子领域。</p>
        </div>
      </div>
      <VoronoiMap
        items={items}
        onOpen={(item) => navigate(`/domain/${item.target.id}`)}
      />
    </>
  );
}
