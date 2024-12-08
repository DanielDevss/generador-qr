import QR from "./qrgenerator";

const cb = ({url}) => {
    return url;
}

new QR(cb);