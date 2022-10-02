import { getJSON, AJAX } from "./helpers";
import { API_URLS, API_KEYS } from "./config";

export const state = {
  ipData: {},
  latLot: [],
  userIp: "",
};

export const getIpInfo = async function (ip) {
  try {
    const data = await AJAX(`${API_URLS.ipify}api/v2/country?apiKey=at_${API_KEYS.ipify}&ipAddress=${ip}`);

    const { ip: ipAdress, isp } = data;
    const { region, timezone } = data.location;

    state.ipData = {
      ipAdress,
      region,
      timezone,
      isp
    };

  } catch (err) {
    throw err;
  }
};

export const getLocation = async function (ip) {
  try {
    const data = await AJAX(`${API_URLS.ipgeolocation}ipgeo?apiKey=${API_KEYS.ipgeolocation}&ip=${ip}`);
    const { latitude, longitude } = data;
    state.latLot = [latitude, longitude];
  } catch (err) {
    throw err;
  }
};

export const getUserLocation = async function () {
  try {
    const data = await AJAX(`${API_URLS.ipifyUserIp}?format=json`);
    const { ip: userIp } = data;
    state.userIp = userIp;
  } catch (err) {
    throw err;
  }
};