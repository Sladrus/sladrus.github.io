"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryWriter = void 0;
const buffer_1 = require("buffer/");
class BinaryWriter {
    constructor(stream) {
        this._stream = stream;
    }
    write(buffer) {
        this._stream = buffer_1.Buffer.concat([this._stream, buffer]);
    }
    getValue() {
        return this._stream;
    }
}
exports.BinaryWriter = BinaryWriter;
