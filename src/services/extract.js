export async function extractReport(input) {
  const request = new Promise((resolve, reject) => {
    if (input.kind === 'text') {
      fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document: input.content }),
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`接口返回 ${response.status}`);
          }
          resolve(await response.json());
        })
        .catch(reject);
      return;
    }

    const formData = new FormData();
    formData.append('document', input.file);
    fetch('/api/extract', {
      method: 'POST',
      body: formData,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`接口返回 ${response.status}`);
        }
        resolve(await response.json());
      })
      .catch(reject);
  });

  const minimumDelay = new Promise((resolve) => window.setTimeout(resolve, 900));
  await Promise.all([request, minimumDelay]);
  return request;
}
