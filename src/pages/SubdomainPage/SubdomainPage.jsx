import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { VoronoiMap } from '../../components/VoronoiMap/VoronoiMap.jsx';
import { useReport } from '../../context/ReportContext.jsx';
import styles from './SubdomainPage.module.less';

export function SubdomainPage() {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const { report } = useReport();
  const domain = report.domains.find((item) => item.id === domainId);

  if (!domain) {
    return null;
  }

  const items = domain.subdomains.map((subdomain) => ({
    id: subdomain.id,
    name: subdomain.name,
    count: subdomain.agentCount,
    agents: subdomain.agents,
    target: subdomain,
  }));

  return (
    <>
      <div className={styles.sectionHeading}>
        <div>
          <h2 className={styles.sectionTitle}>领域：{domain.name}</h2>
          <p className={styles.sectionSubtitle}>{domain.summary} 当前页面展示该领域下的子领域。</p>
        </div>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/domain')}>
          返回领域总览
        </Button>
      </div>
      <VoronoiMap
        items={items}
        onOpen={(item) => navigate(`/domain/${domain.id}/subdomain/${item.target.id}`)}
      />
    </>
  );
}
