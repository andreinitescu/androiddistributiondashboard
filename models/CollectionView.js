export default class CollectionView {
    constructor(items = []) {
        this.items = ko.observable(items);
    }

    _compareProperties(r1, r2, propertyName) {
        const v1 = r1[propertyName];
        const v2 = r2[propertyName];
        return this._compareValues(v1, v2);
    }

    _compareValues(v1, v2) {
        if (v1 < v2) {
            return 1;
        }
        if (v1 > v2) {
            return -1;
        }
        else {
            return 0;
        }
    }
}
