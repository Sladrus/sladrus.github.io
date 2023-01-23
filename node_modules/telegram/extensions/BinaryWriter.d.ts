import { Buffer } from "buffer/";
export declare class BinaryWriter {
    private _stream;
    constructor(stream: Buffer);
    write(buffer: Buffer): void;
    getValue(): Buffer;
}
