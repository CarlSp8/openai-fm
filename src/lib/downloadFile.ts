/**
 * Triggers a file download in the browser
 * @param href - The URL or data URL of the file to download
 * @param filename - The name to use for the downloaded file
 */
export function downloadFile(href: string, filename: string): void {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
