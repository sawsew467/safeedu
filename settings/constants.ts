const API_SERVER = process.env.EXPO_PUBLIC_API_SERVER;
const AI_TOKEN = process.env.EXPO_PUBLIC_AI_TOKEN;
const ACCESS_TOKEN = "_access_token";
const REFRESH_TOKEN = "_refresh_token";
const NOTIFYCA_UPDATE_PROFILE = "_notifyca_update_profile";
const LOGIN_PROMPT_SHOWN = "_login_prompt_shown";
const constants = {
  API_SERVER,
  AI_TOKEN,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  NOTIFYCA_UPDATE_PROFILE,
  LOGIN_PROMPT_SHOWN,
};
export default constants;

export const countries = [
  { label: "Vietnam", code: "VN", value: "+84" },
  { label: "Thailand", code: "TH", value: "+66" },
  { label: "Singapore", code: "SG", value: "+65" },
  { label: "Malaysia", code: "MY", value: "+60" },
  { label: "Indonesia", code: "ID", value: "+62" },
  { label: "Philippines", code: "PH", value: "+63" },
  { label: "Laos", code: "LA", value: "+856" },
  { label: "Cambodia", code: "KH", value: "+855" },
  { label: "Myanmar", code: "MM", value: "+95" },
  { label: "Brunei", code: "BN", value: "+673" },

  { label: "United Kingdom", code: "GB", value: "+44" },
  { label: "France", code: "FR", value: "+33" },
  { label: "Germany", code: "DE", value: "+49" },
  { label: "Netherlands", code: "NL", value: "+31" },
  { label: "Italy", code: "IT", value: "+39" },
  { label: "Sweden", code: "SE", value: "+46" },
  { label: "Norway", code: "NO", value: "+47" },
  { label: "Denmark", code: "DK", value: "+45" },
  { label: "Finland", code: "FI", value: "+358" },

  { label: "United States", code: "US", value: "+1" },
  { label: "Russia", code: "RU", value: "+7" },
  { label: "Japan", code: "JP", value: "+81" },
  { label: "South Korea", code: "KR", value: "+82" },
  { label: "China", code: "CN", value: "+86" },
  { label: "India", code: "IN", value: "+91" },

  { label: "Australia", code: "AU", value: "+61" },
  { label: "Canada", code: "CA", value: "+1" },
  { label: "New Zealand", code: "NZ", value: "+64" },
  { label: "Brazil", code: "BR", value: "+55" },
  { label: "South Africa", code: "ZA", value: "+27" },
  { label: "United Arab Emirates", code: "AE", value: "+971" },
  { label: "Israel", code: "IL", value: "+972" },
];
