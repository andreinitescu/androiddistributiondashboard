import AndroidReleaseServiceClient from "./AndroidReleaseServiceClient.js";
import FloatToStringConverter from "./converters/FloatToStringConverter.js";
import ReleaseTitleConverter from "./converters/ReleaseTitleConverter.js";
import MainViewModel from "./viewModels/MainViewModel.js";

(start)();

async function start() {
    initUI();
    await createMainViewModel();
}

function initUI() {
    const title = `Android distribution in ${getCurrentDateDisplayName()}`;
    $('#title').text(title);

    window.ReleaseTitleConverter = ReleaseTitleConverter;
    window.FloatToStringConverter = FloatToStringConverter;
}

async function createMainViewModel() {
    const androidReleaseServiceClient = new AndroidReleaseServiceClient();

    const mainVM = new MainViewModel(androidReleaseServiceClient);
    ko.applyBindings(mainVM);

    await mainVM.init();
}



/*        const pList = releaseList.map(r => r.distributionPercentage);
       const pList2 = pList.map(p => p.distributionPercentage);
       const pQ = releaseList.find(r => r.name == "Q").distributionPercentage;
       const pR = releaseList.find(r => r.name == "R").distributionPercentage;
       const sum = pList.reduce((s, p) => s + p); */

/* console.log("Q:%f %f R: %f %f", 50.8, pQ, 24.3, pR); */


// https://examples.bootstrap-table.com/index.html#options/table-sortable.html#view-source



// https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/chart/reflow-true/

/* const chart = renderPieChart({
    chartContainerId: 'chart-container',
    releaseList,
    onItemSelected: showSelectedReleaseInfo
}); */

function showSelectedReleaseInfo(release) {
    mainViewModel.selectedRelease(release);
    // chart.reflow();
}

function getCurrentDateDisplayName() {
    const today = new Date();
    return today.toLocaleString('en-US', { year: 'numeric', month: 'long' });
}

function renderStackedBarChar({ chartContainerId, releaseList, onItemSelected }) {
    return Highcharts.chart(chartContainerId, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: ['Android release']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'aa'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: releaseList.map(release => ({ name: release.name, data: [release.distributionPercentage] }))
    });
}

function renderPieChart({ chartContainerId, releaseList, onItemSelected }) {
    return Highcharts.chart(chartContainerId, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            /*                    events: {
                                   selection: onItemSelected
                               } */
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name} {point.version}</b>: {point.percentage:.1f}%'
                }
            }
        },
        series: [{
            colorByPoint: true,
            data: releaseList.map(r => ({ name: `${r.name} - Android ${r.version}`, y: r.distributionPercentage })),
            point: {
                events: {
                    click: function (event) {
                        const item = releaseList[this.x];
                        onItemSelected(item);
                    }
                }
            }
        }]
        /*  series: [{
             name: 'Brands',
             colorByPoint: true,
             data: [{
                 name: 'Chrome',
                 y: 61.41,
                 sliced: true,
                 selected: true
             }, {
                 name: 'Internet Explorer',
                 y: 11.84
             }, {
                 name: 'Firefox',
                 y: 10.85
             }, {
                 name: 'Edge',
                 y: 4.67
             }, {
                 name: 'Safari',
                 y: 4.18
             }, {
                 name: 'Sogou Explorer',
                 y: 1.64
             }, {
                 name: 'Opera',
                 y: 1.6
             }, {
                 name: 'QQ',
                 y: 1.2
             }, {
                 name: 'Other',
                 y: 2.61
             }]
         }] */
    });
}


