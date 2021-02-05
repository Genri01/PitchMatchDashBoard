export function formatDate(date) {
    return new Date(date).toISOString().replace(/-/g,"/").replace(/[TZ]/g," ").replace(/000/, " ");
  }