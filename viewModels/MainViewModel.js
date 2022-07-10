import AndroidReleaseServiceClient from "../AndroidReleaseServiceClient.js";
import ReleaseCollectionView from "../models/ReleaseCollectionView.js";

export default class MainViewModel {
    /**
     * @param {AndroidReleaseServiceClient} androidReleaseServiceClient 
     */
    constructor(androidReleaseServiceClient) {
        this._androidReleaseServiceClient = androidReleaseServiceClient;

        //this.releaseCollectionView = new ReleaseCollectionView();
        this.releaseList = ko.observable();
        this.selectedRelease = ko.observable();
    }

    async init() {
        var releaseList = await this._androidReleaseServiceClient.getReleaseListAsync();
        //this.releaseCollectionView.items(releaseList);
        this.releaseList(releaseList);
        //this.releaseCollectionView.orderByDistributionPercentage();
    }
}
