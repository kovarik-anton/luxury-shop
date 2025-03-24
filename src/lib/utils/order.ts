export function downloadBlobAsFile(blob: Blob, filename: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function openPdfInNewTab(blob: Blob) {
  const pdfUrl = URL.createObjectURL(blob);
  window.open(pdfUrl, "_blank");
}
