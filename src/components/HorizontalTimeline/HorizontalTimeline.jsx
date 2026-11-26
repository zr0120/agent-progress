import { timelineStatusMeta } from '../../utils/status.js';
import styles from './HorizontalTimeline.module.less';

const cardHeights = [150, 126, 178, 142, 136, 166];
const topPositions = [156, 56, 220, 82, 128, 190];

export function HorizontalTimeline({ items }) {
  if (!items.length) {
    return null;
  }

  const maxCardHeight = Math.max(...cardHeights);
  const maxTop = Math.max(...topPositions);
  const axisY = maxTop + maxCardHeight + 42;
  const displayHeight = axisY + 38;
  const canvasWidth = Math.max(760, items.length * 196);

  return (
    <div className={styles.timelineScroll}>
      <div className={styles.timelineCanvas} style={{ height: displayHeight, minWidth: canvasWidth }}>
        <div className={styles.timelineAxis} style={{ top: axisY }} />
        <div className={styles.timelineArrow} style={{ top: axisY }} />

        {items.map((item, index) => {
          const top = topPositions[index % topPositions.length];
          const cardHeight = cardHeights[index % cardHeights.length];
          const meta = timelineStatusMeta[item.status] ?? timelineStatusMeta.todo;
          const left = `${((index + 0.5) / items.length) * 100}%`;
          const connectorHeight = axisY - (top + cardHeight);

          return (
            <div className={styles.timelineSlot} key={item.id} style={{ left }}>
              <div
                className={styles.timelineCard}
                style={{
                  top,
                  height: cardHeight,
                  borderTopColor: meta.color,
                }}
              >
                <div className={styles.timelineCardHead}>
                  <span className={styles.timelineDate}>{item.date}</span>
                  <span
                    className={styles.timelineStatus}
                    style={{ color: meta.color, background: meta.background }}
                  >
                    {meta.label}
                  </span>
                </div>
                <div className={styles.timelineCardTitle}>{item.title}</div>
                <div className={styles.timelineCardDesc}>{item.description}</div>
              </div>
              <div
                className={styles.timelineConnector}
                style={{ top: top + cardHeight, height: connectorHeight }}
              />
              <div
                className={styles.timelineNode}
                style={{ top: axisY, background: meta.color, boxShadow: `0 0 0 5px ${meta.background}` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
