import CollectionView from "./CollectionView.js";

export default class ReleaseCollectionView extends CollectionView {
    constructor(items) {
        super(items);
        //this.orderByDistributionPercentage();
    }

    orderByDistributionPercentage() {
        const sortedReleaseList = this.items().sort((r1, r2) => this.compareDistributionByDistributionPercentage(r1, r2));
        this.items(sortedReleaseList);
    }

    compareDistributionByDistributionPercentage(r1, r2) {
        return this._compareProperties(r1, r2, "distributionPercentage");
    }
}
