import { ArrowLeftOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button, Progress } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { HorizontalTimeline } from '../../components/HorizontalTimeline/HorizontalTimeline.jsx';
import { useReport } from '../../context/ReportContext.jsx';
import { progressStatusMeta } from '../../utils/status.js';
import styles from './AgentDetailPage.module.less';

export function AgentDetailPage() {
  const { domainId, subdomainId, agentId } = useParams();
  const navigate = useNavigate();
  const { report } = useReport();
  const domain = report.domains.find((item) => item.id === domainId);
  const subdomain = domain?.subdomains.find((item) => item.id === subdomainId);
  const agent = subdomain?.agents.find((item) => item.id === agentId);

  if (!agent) {
    return null;
  }

  const meta = progressStatusMeta[agent.status] ?? progressStatusMeta.planned;

  return (
    <>
      <div className={styles.sectionHeading}>
        <div>
          <h2 className={styles.sectionTitle}>智能体：{agent.name}</h2>
          <p className={styles.sectionSubtitle}>当前页面展示该智能体的详情、进度与时间线。</p>
        </div>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(`/domain/${domain.id}/subdomain/${subdomain.id}`)}
        >
          返回子领域：{subdomain.name}
        </Button>
      </div>
      <div className={styles.detailGrid}>
        <aside className={styles.detailPanel}>
          <div className={styles.tileTop}>
            <h2 className={styles.agentName}>{agent.name}</h2>
            <span
              className={styles.timelineStatus}
              style={{ color: meta.color, background: meta.background }}
            >
              {meta.label}
            </span>
          </div>
          <p className={styles.agentRole}>{agent.role}</p>
          <p className={styles.agentRole}>{agent.description}</p>

          <div className={styles.detailProgress}>
            <div className={styles.detailProgressLabel}>
              <span>整体进度</span>
              <strong>{agent.progress}%</strong>
            </div>
            <Progress percent={agent.progress} strokeColor={meta.color} />
          </div>

          <div className={styles.metricGrid}>
            {agent.metrics.map((metric) => (
              <div className={styles.metricBox} key={metric.label}>
                <div className={styles.metricBoxLabel}>{metric.label}</div>
                <div className={styles.metricBoxValue}>{metric.value}</div>
              </div>
            ))}
          </div>
        </aside>

        <section className={styles.timelinePanel}>
          <div className={styles.timelinePanelTitle}>
            <ClockCircleOutlined /> 时间线
          </div>
          <HorizontalTimeline items={agent.timeline} />
        </section>
      </div>
    </>
  );
}
