import QR from "./qrgenerator";

const cb = ({phone, message}) => {

    return `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;

}

new QR(cb);