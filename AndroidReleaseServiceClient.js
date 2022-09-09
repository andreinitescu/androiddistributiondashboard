import AndroidRelease from "./models/AndroidRelease.js";
import AndroidReleaseDescription from "./models/AndroidReleaseDescription.js";

export default class AndroidReleaseServiceClient {
    async getReleaseListAsync() {
        const releaseDataList = await this._getRemoteDataAsync();
        return releaseDataList.map((releaseData) => Mapper.mapToAndroidRelease(releaseData, releaseDataList));
    }

    /** @returns {Promise<Array>} */
    async _getRemoteDataAsync() {
        const url = './data.json';
        const response = await fetch(url);
        return await response.json();
    }
}

class Mapper {
    /**
     * 
     * @param {AndroidRelease} release 
     * @param {AndroidRelease[]} allReleases 
     * @returns 
     */
    static mapToAndroidRelease(release, allReleases) {
        const distributionPercentage = release.distributionPercentage * 100.0;

        const cummulativeDistributionPercentage = allReleases
            .filter(r => r.apiLevel >= release.apiLevel)
            .reduce((sum, release) => sum + release.distributionPercentage, 0) * 100.0;

        return new AndroidRelease({
            ...release,
            distributionPercentage,
            cummulativeDistributionPercentage,
            descriptions: release.descriptionBlocks.map(Mapper.mapToAndroidReleaseDescription)
        })
    }

    static mapToAndroidReleaseDescription(descriptionBlock) {
        return new AndroidReleaseDescription(descriptionBlock);
    }
}
