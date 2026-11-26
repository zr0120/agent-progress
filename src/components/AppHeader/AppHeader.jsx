import {
  ApartmentOutlined,
  HomeOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Tooltip } from 'antd';
import styles from './AppHeader.module.less';

export function AppHeader({ report, view, onNavigate, onReset }) {
  const breadcrumbItems = [
    {
      title: (
        <span onClick={() => onNavigate({ type: 'overview' })}>
          <HomeOutlined /> 总览
        </span>
      ),
    },
    ...(view.type === 'overview'
      ? []
      : [
          {
            title: (
              <span onClick={() => onNavigate({ type: 'domain', domainId: view.domain.id })}>
                {view.domain.name}
              </span>
            ),
          },
        ]),
    ...(view.type === 'subdomain' || view.type === 'agent'
      ? [
          {
            title: (
              <span
                onClick={() =>
                  onNavigate({
                    type: 'subdomain',
                    domainId: view.domain.id,
                    subdomainId: view.subdomain.id,
                  })
                }
              >
                {view.subdomain.name}
              </span>
            ),
          },
        ]
      : []),
    ...(view.type === 'agent'
      ? [{ title: <span>{view.agent.name}</span> }]
      : []),
  ];

  return (
    <header className={styles.appHeader}>
      <div className={styles.headerTop}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>
            <ApartmentOutlined />
          </div>
          <div className={styles.brandTitle}>进度看板</div>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.reportMeta}>
            {report.sourceName} · {report.extractedAt}
          </span>
          <Tooltip title="重新导入文档">
            <Button icon={<ReloadOutlined />} onClick={onReset}>
              重新导入
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className={styles.headerBreadcrumb}>
        <Breadcrumb items={breadcrumbItems} />
      </div>
    </header>
  );
}
