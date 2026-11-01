# Local third-party code

- `vendor/qrcodegen.js`: Project Nayuki QR Code generator, MIT license retained in the file header. Downloaded from https://www.nayuki.io/res/qr-code-generator-library/qrcodegen.js. Project and API: https://www.nayuki.io/page/qr-code-generator-library. This local script replaces the incomplete embedded QR implementation; no external runtime requests are made.
- `tests/vendor/jsQR.cjs`: independent QR decoder used only by the test runner, Apache 2.0 license in `tests/vendor/jsQR-LICENSE.txt`. Exact upstream commit URL is recorded in `tests/vendor/jsQR-source.txt`. Project: https://github.com/cozmo/jsQR. It is not loaded by the app or stored in the app’s offline cache.
