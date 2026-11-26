import {
  CloudUploadOutlined,
  FileTextOutlined,
  SendOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Alert, Button, Segmented, Space, Typography, Upload } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReport } from '../../context/ReportContext.jsx';
import styles from './UploadPage.module.less';

const { Paragraph, Text } = Typography;

export function UploadPage() {
  const { loading, extract } = useReport();
  const navigate = useNavigate();
  const [mode, setMode] = useState('text');
  const [text, setText] = useState('');
  const [fileList, setFileList] = useState([]);
  const [error, setError] = useState('');

  const canSubmit = mode === 'text' ? text.trim().length > 0 : fileList.length > 0;

  const handleSubmit = async () => {
    if (mode === 'text') {
      if (!text.trim()) {
        setError('请先粘贴需要解析的文档内容。');
        return;
      }
      setError('');
      const nextReport = await extract({ kind: 'text', content: text.trim() });
      if (nextReport) {
        navigate('/domain');
      }
      return;
    }

    const originFile = fileList[0]?.originFileObj;
    if (!originFile) {
      setError('请先选择需要解析的文档。');
      return;
    }
    setError('');
    const nextReport = await extract({ kind: 'file', file: originFile });
    if (nextReport) {
      navigate('/domain');
    }
  };

  return (
    <main className={styles.uploadStage}>
      <div className={styles.uploadShell}>
        <section className={styles.uploadIntro}>
          <h1 className={styles.uploadTitle}>分析文档</h1>
          <p className={styles.uploadSubtitle}>
            粘贴或上传业务汇报文档，系统将提取信用卡、零售、对公等领域的智能体进度与时间线。
          </p>
        </section>

        <section className={styles.uploadPanel}>
          <div className={styles.uploadModeRow}>
            <Segmented
              value={mode}
              onChange={setMode}
              options={[
                { label: '粘贴内容', value: 'text', icon: <FileTextOutlined /> },
                { label: '上传文档', value: 'file', icon: <CloudUploadOutlined /> },
              ]}
            />
            <Button icon={<SwapOutlined />} onClick={() => setMode(mode === 'text' ? 'file' : 'text')}>
              切换
            </Button>
          </div>

          {mode === 'text' ? (
            <div className={styles.pasteWrap}>
              <Paragraph type="secondary">
                将文档正文粘贴到下方，支持 Markdown、纯文本或直接复制的会议记录。
              </Paragraph>
              <textarea
                className={styles.pasteTextarea}
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="在这里粘贴文档内容..."
              />
            </div>
          ) : (
            <div className={styles.fileWrap}>
              <Upload.Dragger
                accept=".txt,.md,.doc,.docx,.pdf"
                fileList={fileList}
                maxCount={1}
                beforeUpload={() => false}
                onChange={({ fileList: nextList }) => {
                  setFileList(nextList.slice(-1));
                  setError('');
                }}
                onRemove={() => setFileList([])}
              >
                <p className="ant-upload-drag-icon">
                  <CloudUploadOutlined />
                </p>
                <p className="ant-upload-text">拖拽文档到此处，或点击选择文件</p>
                <p className="ant-upload-hint">支持 TXT、Markdown、Word 与 PDF。</p>
              </Upload.Dragger>
            </div>
          )}

          {error && (
            <Alert
              className={styles.uploadAlert}
              type="error"
              showIcon
              message={error}
            />
          )}

          <div className={styles.submitRow}>
            <Space>
              <Text type="secondary">
                {mode === 'text' ? `${text.trim().length} 字` : fileList[0]?.name ?? '未选择文件'}
              </Text>
              <Button
                type="primary"
                icon={<SendOutlined />}
                loading={loading}
                disabled={!canSubmit}
                onClick={handleSubmit}
              >
                {loading ? '正在解析' : '开始解析'}
              </Button>
            </Space>
          </div>
        </section>
      </div>
    </main>
  );
}
