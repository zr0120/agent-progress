import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Popover, Progress } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useReport } from '../../context/ReportContext.jsx';
import { progressStatusMeta } from '../../utils/status.js';
import styles from './AgentListPage.module.less';

function agentHover(agent) {
  return (
    <div className={styles.hoverPanel}>
      <div className={styles.hoverTitle}>{agent.name}</div>
      <ul className={styles.hoverList}>
        <li className={styles.hoverItem}>
          <span>当前进度</span>
          <strong>{agent.progress}%</strong>
        </li>
        <li className={styles.hoverItem}>
          <span>状态</span>
          <strong>{progressStatusMeta[agent.status]?.label}</strong>
        </li>
        {agent.metrics.map((metric) => (
          <li className={styles.hoverItem} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AgentListPage() {
  const { domainId, subdomainId } = useParams();
  const navigate = useNavigate();
  const { report } = useReport();
  const domain = report.domains.find((item) => item.id === domainId);
  const subdomain = domain?.subdomains.find((item) => item.id === subdomainId);

  if (!subdomain) {
    return null;
  }

  return (
    <>
      <div className={styles.sectionHeading}>
        <div>
          <h2 className={styles.sectionTitle}>子领域：{subdomain.name}</h2>
          <p className={styles.sectionSubtitle}>{subdomain.summary} 当前页面展示该子领域下的智能体。</p>
        </div>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(`/domain/${domain.id}`)}>
          返回领域：{domain.name}
        </Button>
      </div>
      <section className={styles.layerGrid}>
        {subdomain.agents.map((agent) => {
          const meta = progressStatusMeta[agent.status] ?? progressStatusMeta.planned;

          return (
            <Popover key={agent.id} content={agentHover(agent)} placement="top">
              <button
                className={styles.clickableTile}
                onClick={() =>
                  navigate(`/domain/${domain.id}/subdomain/${subdomain.id}/agent/${agent.id}`)
                }
              >
                <div className={styles.tileTop}>
                  <h3 className={styles.tileTitle}>{agent.name}</h3>
                  <span
                    className={styles.timelineStatus}
                    style={{ color: meta.color, background: meta.background }}
                  >
                    {meta.label}
                  </span>
                </div>
                <p className={styles.tileDescription}>{agent.role}</p>
                <div className={styles.tileFooter}>
                  <span className={styles.progressMeta}>{agent.progress}%</span>
                  <Progress
                    percent={agent.progress}
                    size="small"
                    strokeColor={meta.color}
                    style={{ width: 118 }}
                  />
                </div>
              </button>
            </Popover>
          );
        })}
      </section>
    </>
  );
}
