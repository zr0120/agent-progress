import { useMemo } from 'react';
import { Tooltip } from 'antd';
import { voronoiMapSimulation } from 'd3-voronoi-map';
import { progressStatusMeta } from '../../utils/status.js';
import styles from './VoronoiMap.module.less';

const SIZE = 800;
const CENTER = SIZE / 2;
const RADIUS = 385;
const CLIP_STEPS = 72;
const LAYOUT_SEED = 20261122;

function circleClip() {
  const points = [];

  for (let index = CLIP_STEPS; index > 0; index -= 1) {
    const angle = (Math.PI * 2 * index) / CLIP_STEPS;
    points.push([CENTER + Math.cos(angle) * RADIUS, CENTER + Math.sin(angle) * RADIUS]);
  }

  return points;
}

function polygonPath(points) {
  return `M${points.map((point) => point.join(',')).join('L')}Z`;
}

function insetPolygon(polygon, centroid, ratio) {
  return polygon.map((point) => [
    centroid[0] + (point[0] - centroid[0]) * ratio,
    centroid[1] + (point[1] - centroid[1]) * ratio,
  ]);
}

function polygonCentroid(points) {
  let area = 0;
  let x = 0;
  let y = 0;

  for (let index = 0; index < points.length; index += 1) {
    const [x0, y0] = points[index];
    const [x1, y1] = points[(index + 1) % points.length];
    const cross = x0 * y1 - x1 * y0;

    area += cross;
    x += (x0 + x1) * cross;
    y += (y0 + y1) * cross;
  }

  return [x / (3 * area), y / (3 * area)];
}

function seededRandom(seed) {
  let state = seed >>> 0;

  return function nextRandom() {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function colorForCount(count, minCount, maxCount) {
  const ratio = maxCount === minCount ? 0.5 : (count - minCount) / (maxCount - minCount);
  const lightness = 86 - ratio * 48;

  return `hsl(214, 84%, ${lightness}%)`;
}

function domainTooltip(subdomains) {
  return (
    <div className={styles.tooltipPanel}>
      {subdomains.map((subdomain) => (
        <div className={styles.tooltipRow} key={subdomain.id}>
          <span>{subdomain.name}</span>
          <strong>{subdomain.agentCount} 个智能体 · {subdomain.averageProgress}%</strong>
        </div>
      ))}
    </div>
  );
}

function agentTooltip(agents) {
  return (
    <div className={styles.tooltipPanel}>
      {agents.map((agent) => {
        const meta = progressStatusMeta[agent.status] ?? progressStatusMeta.planned;

        return (
          <div className={styles.tooltipRow} key={agent.id}>
            <span>{agent.name}</span>
            <strong>{meta.label} · {agent.progress}%</strong>
          </div>
        );
      })}
    </div>
  );
}

function plateTooltip(item) {
  if (item.subdomains) {
    return domainTooltip(item.subdomains);
  }

  if (item.agents) {
    return agentTooltip(item.agents);
  }

  return null;
}

function computeLayout(items) {
  const counts = items.map((item) => item.count);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);

  const data = items.map((item) => ({
    ...item,
    weight: item.count,
    color: colorForCount(item.count, minCount, maxCount),
  }));

  const simulation = voronoiMapSimulation(data)
    .weight((item) => item.weight)
    .clip(circleClip())
    .convergenceRatio(0.005)
    .maxIterationCount(400)
    .prng(seededRandom(LAYOUT_SEED))
    .stop();

  let state = simulation.state();

  while (!state.ended) {
    simulation.tick();
    state = simulation.state();
  }

  return state.polygons.map((polygon) => {
    const item = polygon.site.originalObject.data.originalData;
    const centroid = polygonCentroid(polygon);

    return {
      item,
      path: polygonPath(insetPolygon(polygon, centroid, 0.96)),
      centroid,
    };
  });
}

export function VoronoiMap({ items, onOpen }) {
  const plates = useMemo(() => computeLayout(items), [items]);

  return (
    <svg className={styles.plateMap} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img">
      <circle className={styles.plateMapBackground} cx={CENTER} cy={CENTER} r={RADIUS} />
      {plates.map((plate) => (
        <g
          className={styles.plateCell}
          key={plate.item.id}
          onClick={() => onOpen(plate.item)}
        >
          <Tooltip
            title={plateTooltip(plate.item)}
            placement="top"
            overlayClassName={styles.plateTooltip}
          >
            <path
              className={styles.platePath}
              d={plate.path}
              fill={plate.item.color}
              stroke="#ffffff"
              strokeWidth={0}
            />
          </Tooltip>
          <text
            className={styles.plateName}
            x={plate.centroid[0]}
            y={plate.centroid[1] - 6}
            textAnchor="middle"
          >
            {plate.item.name}
          </text>
          <text
            className={styles.plateCount}
            x={plate.centroid[0]}
            y={plate.centroid[1] + 22}
            textAnchor="middle"
          >
            {plate.item.count} 智能体
          </text>
        </g>
      ))}
    </svg>
  );
}
