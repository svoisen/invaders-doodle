export default class Util {
    /**
     * Convert a decimal number to a binary string representation.
     *
     * @param num {Number} The number to convert.
     * @param precision
     * @returns {string}
     */
    static dec2BinString(num, precision = 0) {
        var out = "";

        while (num > 0) {
            if (num % 2 > 0) {
                out = "1" + out;
            }
            else {
                out = "0" + out;
            }
            num = Math.floor(num / 2)
        }

        while (out.length < precision) {
            out = "0" + out;
        }

        return out;
    }
}