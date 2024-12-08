import QR from "./qrgenerator";

const cb = ({ SSID, password, hidden='', type }) => {

    return `WIFI:T:${type};S:${SSID};P:${password};H:${hidden};`
}

new QR(cb);

