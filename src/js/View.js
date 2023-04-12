import markerIcon from "../img/icon-location.svg"

class View {
  _form = document.querySelector(".header__ip-input");
  _btn = document.querySelector(".header__input-btn");
  _ipInfoContainer = document.querySelector(".ip-info-container");
  _inputIp = document.getElementById("ip-input");
  _ipText = document.getElementById("ip-text");
  _locationText = document.getElementById("location-text");
  _timezoneText = document.getElementById("timezone-text");
  _ispText = document.getElementById("isp-text");
  _map;
  _marker;


  renderIpInfo(ip, region, timezone, isp) {
    this._ipText.textContent = ip;
    this._locationText.textContent = region;
    this._timezoneText.textContent = timezone;
    this._ispText.textContent = isp;
  }

  _addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _addHandlerToggleZoomBtns(handler) {
    window.addEventListener("resize", handler);
  }

  _addHandlerChangeMapView(handler) {
    const self = this;
    this._btn.addEventListener("click", function (e) {
      e.preventDefault();
      self.removeError();
      handler();
    });
  }

  initMap(lat, lot, zoom, usedMap) {
    this._map = L.map("map").setView([lat, lot], zoom);

    L.tileLayer(usedMap).addTo(this._map);

    this.setMapMarker(lat, lot);
  }

  changeMapView(lat, lot, zoom) {
    this._map.setView([lat, lot], zoom, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    if (this._map.hasLayer(this._marker)) this._map.removeLayer(this._marker);

    this.setMapMarker(lat, lot);
  }

  setMapMarker(lat, lot) {
    this._marker = L.marker([lat, lot], {
      icon: L.icon({
        iconUrl: markerIcon,
        iconSize: [41, 51],
        iconAnchor: [20, 51],
        popupAnchor: [0, -51]
      })
    }).addTo(this._map);
  }

  renderError(message) {
    if (document.querySelector(".error-message")) return;
    const markup = `<p class="error-message">${message}</p>`;
    this._form.insertAdjacentHTML("afterend", markup);
  };

  removeError() {
    if (this._inputIp.value.trim()) document.querySelector(".error-message")?.remove();
  };

  showSpinner() {
    document.querySelector(".loader").classList.toggle("hidden");
    this._ipInfoContainer.classList.toggle("hidden");
  }
}

export default new View();