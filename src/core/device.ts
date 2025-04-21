import { UAParser } from "ua-parser-js";

const parser = new UAParser();
const ua = parser.getResult();

export const deviceInfo = {
  ip: null,
  user_agent: navigator.userAgent,
  platform: ua.os.name,
  os_version: ua.os.version,
  browserName: ua.browser.name,
  browserVersion: ua.browser.version,
  language: navigator.language,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  screen_resolution: {
    width: window.screen.width,
    height: window.screen.height,
    color_depth: window.screen.colorDepth,
  },
  installed_fonts: [],
  hardware: `${navigator.hardwareConcurrency} cores`,
};

(async () => {
  const response = await fetch("https://api.ipify.org?format=json");
  if (response.status === 200) {
    const data = (await response.json()) as { ip: string };
    deviceInfo.ip = data.ip;
  }
})();
