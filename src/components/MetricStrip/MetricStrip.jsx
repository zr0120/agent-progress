import {
  ApartmentOutlined,
  ClockCircleOutlined,
  NodeIndexOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';
import styles from './MetricStrip.module.less';

export function MetricStrip({ report }) {
  const totalSubdomains = report.domains.reduce((sum, domain) => sum + domain.subdomainCount, 0);
  const totalAgents = report.domains.reduce(
    (sum, domain) => sum + domain.subdomains.reduce((inner, item) => inner + item.agentCount, 0),
    0,
  );
  const totalProgress = report.domains.reduce((sum, domain) => sum + domain.averageProgress, 0);
  const overall = Math.round(totalProgress / report.domains.length);

  const items = [
    { label: '业务领域', value: report.domains.length, icon: <ApartmentOutlined /> },
    { label: '子领域', value: totalSubdomains, icon: <NodeIndexOutlined /> },
    { label: '智能体', value: totalAgents, icon: <RobotOutlined /> },
    { label: '平均进度', value: `${overall}%`, icon: <ClockCircleOutlined /> },
  ];

  return (
    <section className={styles.metricStrip}>
      {items.map((item) => (
        <div className={styles.metricTile} key={item.label}>
          <div className={styles.metricLabel}>
            <Space size={6}>
              {item.icon}
              {item.label}
            </Space>
          </div>
          <div className={styles.metricValue}>{item.value}</div>
        </div>
      ))}
    </section>
  );
}
