export default class FloatToStringConverter {
    /**
     * @param {number} f 
     * @returns 
     */
    static convert(f) {
        return `${f.toFixed(1)}%`;
    }
}