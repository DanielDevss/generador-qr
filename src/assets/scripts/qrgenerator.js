import QRCode from "qrcode";
import Toastify from 'toastify-js'

class QR {

    constructor (callback) {

        // Callback
        if(typeof callback !== 'function') throw new Error('Callback no encontrado');
        this.callback = callback;

        // Formulario
        this.form = document.querySelector('#form');
        if(!this.form) {
            _this._toast("Error al cargar el formulario", "error");
        };

        // Preview
        this.imgPreview = document.querySelector('#displayPreview');
        this.previewDefault = "qrcodeexample.png";

        //Botones download
        this.buttons = [
            document.querySelector('#downloadSVG'),
            document.querySelector('#downloadPNG'),
            document.querySelector('#downloadJPG'),
            document.querySelector('#downloadWEBP'),
        ]

        // Variables
        this.svg = null;
        this.images = null;

        // Eventos
        this._bindEvents(callback);
    }

    async _bindEvents () {
        this.form.addEventListener('submit', this._generate.bind(this));
        this.buttons.forEach(button => button.addEventListener('click', this._download.bind(this)));

    }

    /* --------------------------------- EVENTOS -------------------------------- */

    // Generar
    async _generate (e) {
        e.preventDefault();
        this.formData = new FormData(this.form);
        this.formObject = Object.fromEntries(this.formData);
        this.text = this.callback(this.formObject)
        this.svg = await this._toSvg()
        this.images = {
            png: await this._toImage('png'),
            jpg: await this._toImage('jpg'),
            webp: await this._toImage('webp')
        }
        this._changePreview()
    }

    // Descargar
    async _download (e) {
        e.preventDefault();
        const name = e.target.dataset.name;
        this._downloadFile(name)
    }

    async _downloadFile(format) {

        let url;

        if(format == "svg") {
            url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(this.svg)}`;
        }

        else if (this?.images[format]) {
            url = this.images[format];
        }

        else {
            this._toast(`Lo sentimos, no disponemos del formato ${format}`, "error");
            return 
        }

        const fileName = `qrcode-${Math.random().toString(36).substring(2, 15)}.${format}`;
        const link = document.createElement('a');
        link.download = fileName;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    // Generar el SVG
    async _toSvg () {
        try {
            return await QRCode.toString(this.text, { type: 'svg' });
        } catch (error) {
            this._toast("Error al generar el SVG", "error");
            throw error;
        }
    }

    // Generar la imagen
    async _toImage (type='png') {
        const options = {
            errorCorrectionLevel: 'H',
            type: 'image/' + type,
            quality: 1,
            margin: 1,
            color: {
                dark: "#000000",
                light: "#FFFFFF"
            }
        }
        try {
            return await QRCode.toDataURL(this.text, options);
        }
        catch (error) {
            this._toast(`Error al generar el ${type.toUpperCase()}` , "error");
            throw error;
        }
    }

    // Actualizamos el preview
    async _changePreview () {
        if(this.images?.png) {
            this.imgPreview.src = this.images.png;
            this._toast("Código QR generado con éxito", "success");
        }else{
            this.imgPreview.src = this.previewDefault;
            this._toast("Error al generar el código QR", "error");
        }
    }

    // Alertas

    _toast(text, type) {
        const typesBackgrounds = {
            success: 'linear-gradient(to right, #95BF56, #D3D929)',
            error: 'linear-gradient(to right, #ff0000, #ffe000)',
        }

        Toastify({
            text: text,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: typesBackgrounds[type],
            }
        }).showToast()
    }
}

export default QR;