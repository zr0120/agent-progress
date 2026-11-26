import { message } from 'antd';
import { createContext, useContext, useState } from 'react';
import { extractReport } from '../services/extract.js';

const ReportContext = createContext(null);

export function ReportProvider({ children }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const extract = async (input) => {
    setLoading(true);
    try {
      const nextReport = await extractReport(input);
      setReport(nextReport);
      return nextReport;
    } catch (error) {
      console.error(error);
      message.error('文档解析失败，请检查后端接口后重试。');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => setReport(null);

  return (
    <ReportContext.Provider value={{ report, loading, extract, reset }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  return useContext(ReportContext);
}
