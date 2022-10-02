import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";
import "core-js/stable";

import { DEFAULT_ZOOM, USED_MAP } from "./config";
import * as model from "./model";
import View from "./View";

const LoadInitMap = async function () {
  try {
    View.showSpinner();
    await model.getUserLocation();
    await model.getLocation(model.state.userIp);
    await model.getIpInfo(model.state.userIp);
    View.showSpinner();

    View.renderIpInfo(...Object.values(model.state.ipData));
    View.initMap(...model.state.latLot, DEFAULT_ZOOM, USED_MAP);
    controlZoomBtns();
  } catch (err) {
    View.renderError("Something went wrong");
  }
};

const controlZoomBtns = function () {
  const mediaQuery = window.matchMedia('(max-width: 1000px)');
  if (mediaQuery.matches) {
    View._map?.removeControl(View._map.zoomControl);
  } else {
    View._map?.addControl(View._map.zoomControl);
  }
};

const controlMapView = async function () {
  const inputIpVal = View._inputIp.value.trim();
  if (!inputIpVal) return;

  try {
    View.showSpinner();
    await model.getLocation(inputIpVal);
    await model.getIpInfo(inputIpVal);
    View.showSpinner();

    View.renderIpInfo(...Object.values(model.state.ipData));
    View.changeMapView(...model.state.latLot, DEFAULT_ZOOM);
  } catch (err) {
    View.renderError("Something went wrong");
  }
};

const init = function () {
  View._addHandlerRender(LoadInitMap());
  View._addHandlerToggleZoomBtns(controlZoomBtns);
  View._addHandlerChangeMapView(controlMapView);
};
init();