import { AJAX } from "./helpers";
import { API_URL_GEO, API_URL_IP, API_KEY } from "./config";

export const state = {
  ipData: {},
  userIp: "",
};

export const getIpInfo = async (ip) => {
  try {
    const data = await AJAX(`${API_URL_GEO}api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`);

    const { ip: ipAdress, isp } = data;
    const { region, timezone, lat, lng } = data.location;

    state.ipData = {
      ipAdress,
      region,
      timezone,
      isp,
      lat,
      lng
    };

  } catch (err) {
    throw err;
  }
};

export const getUserIp = async () => {
  try {
    const data = await AJAX(API_URL_IP);
    state.userIp = data.ip;
  } catch (err) {
    throw err;
  }
};