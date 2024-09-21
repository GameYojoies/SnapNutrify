'use strict';

(function (window) {
    'use strict';

    var json = function json() { };

    var lengthToBytes = function lengthToBytes(length) {
        var arrayBuffer = new ArrayBuffer(4);
        var dataView = new DataView(arrayBuffer);
        dataView.setInt32(0, length);
        return new Uint8Array(arrayBuffer);
    };

    var concatBytes = function concatBytes() {
        var length = 0,
            offset = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var array = _step.value;

                length += array.length;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var bytes = new Int8Array(length);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = arguments[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _array = _step2.value;

                bytes.set(_array, offset);
                offset += _array.length;
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return bytes;
    };

    json.prototype.parseMsg = json.parseMsg = async function (data, funWs) {
        var length = 4;
        var offset = await data.slice(0, length).arrayBuffer();
        var headLength = new DataView(offset).getInt32();

        var header = JSON.parse((await data.slice(length, headLength + length).text()));
        length += headLength;
        //console.debug('header:', header);

        var body = null;
        try {
            body = JSON.parse((await data.slice(length + 4).text()));
        } catch (e) { }

        //console.debug('body:', body);

        if (funWs != null) {
            funWs(header, body);
        }

        return { header: header, body: body };
    };

    json.prototype.generateMsgOfStr = json.generateMsgOfStr = async function (str) {
        var payload = JSON.parse(str);
        return this.generateMsg(payload.header, payload.body);
    };

    json.prototype.generateMsg = json.generateMsg = async function (header, body) {
        var textEncoder = new TextEncoder('UTF-8');
        var headerBytes = textEncoder.encode(JSON.stringify(header));
        var bodyBytes = body ? textEncoder.encode(JSON.stringify(body)) : [];

        var headerLength = lengthToBytes(headerBytes.length);
        var bodyLength = lengthToBytes(bodyBytes.length);
        return concatBytes(headerLength, headerBytes, bodyLength, bodyBytes);
    };

    window.wsFormat = json;
})(window);