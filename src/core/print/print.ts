export default {
  init: (path: string) => {
    const fileName = getFileName(path);
    console.log(`[${fileName}] starting executing <.${path.split("rpmanager3")[1]}>`);
  },
  log: (path: string, message: string) => {
    let fileName = getFileName(path);

    switch (fileName) {
      case "events":
        fileName = `\x1b[35m${fileName.toUpperCase()}\x1b[0m`;
        message = `(\x1b[34m${message}\x1b[0m)`;
        break;
    }

    console.log(`[${fileName}] ${message}`);
  },
  error: (path: string, message: string | unknown, error?: unknown) => {
    const fileName = getFileName(path);
    console.log("***********");
    if (message && error) {
      console.error(`[${fileName}] ${message ?? ""}`, error ?? "");
    } else {
      console.error(`[${fileName}]`, message);
    }
    console.log("***********");
  },
  warn: (path: string, message: string, error?: unknown) => {
    const fileName = getFileName(path);
    console.log(`[${fileName}] ${message}`);
    if (error) {
      console.warn(error);
    }
  },
};

export function getFileName(path: string) {
  let fileName: string[] | string = path.replace(/[\\/]/g, "/").split("/");
  fileName = fileName[fileName.length - 1].split(".")[0];

  return fileName;
}
