import AndroidRelease from "./models/AndroidRelease.js";
import AndroidReleaseDescription from "./models/AndroidReleaseDescription.js";

export default class AndroidReleaseServiceClient {
    async getReleaseListAsync() {
        const releaseDataList = await this._getRemoteDataAsync();
        return releaseDataList.map(Mapper.mapToAndroidRelease);
    }

    /** @returns {Promise<Array>} */
    async _getRemoteDataAsync() {
        const url = './data.json';
        const response = await fetch(url);
        return await response.json();
    }
}

class Mapper {
    static mapToAndroidRelease(release) {
        return new AndroidRelease({ ...release, descriptions: release.descriptionBlocks.map(Mapper.mapToAndroidReleaseDescription) })
    }

    static mapToAndroidReleaseDescription(descriptionBlock) {
        return new AndroidReleaseDescription(descriptionBlock);
    }
}
