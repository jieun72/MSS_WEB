$(document).ready(function(){
    $("#menuTypes").removeClass("active");

    var mapData = [
        {'lat':52, 'lon':20, 'val':13},
        {'lat':60, 'lon':120.12, 'val':6},
        {'lat':-20, 'lon':60.12, 'val':33},
        {'lat':11, 'lon':-177.12, 'val':22},
        {'lat':43, 'lon':10.12, 'val':17},
        {'lat':-74, 'lon':-58.12, 'val':42},
        {'lat':-10, 'lon':10.12, 'val':2},
        {'lat':87, 'lon':-120.12, 'val':3},
        {'lat':37, 'lon':132.12, 'val':49.9},
        {'lat':52, 'lon':2, 'val':-0.2},
        {'lat':60, 'lon':72.12, 'val':-6},
        {'lat':-20, 'lon':-60.12, 'val':-13},
        {'lat':11, 'lon':147.12, 'val':-2},
        {'lat':43, 'lon':50.12, 'val':-17},
        {'lat':-74, 'lon':-18.12, 'val':-4},
        {'lat':-10, 'lon':101.12, 'val':-2},
        {'lat':87, 'lon':-10.12, 'val':-30},
        {'lat':37, 'lon':32.12, 'val':-49.9}
    ];

    var max = 0;
    var min = 0;

    var bins = [];

    mapData.forEach(function (itemOpt) {
        if (itemOpt.val > max) {
            max = itemOpt.val;
        }
        if (itemOpt.val < min) {
            min = itemOpt.val;
        }
        bins.push(itemOpt.val);
    });

    var bins2 = ecStat.histogram(bins);

    var mychart = echarts.init($('#mychart')[0]);

    mychart.setOption({
        backgroundColor: '#fff',
        toolbox: {
            show: true,
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            feature: {
                mark: {
                    show: true
                },
                restore: {
                    show: true,
                    title: "Restore"
                },
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        visualMap: {
            left: 'center',
            min: min,
            max: max,
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            },
            calculable: true,
            textStyle: {
                color: '#000'
            },
            orient: 'horizontal'
        },
        geo: {
            type: 'map',
            map: 'world',
            roam: false,            // 줌조작 비활성화
            zoom: 1.2,
            silent: true,           // 지도화면조작 비활성화
            emphasis : {
                disable: true       // 국가 선택 비활성화
            },
            itemStyle: {
                normal: {
                    areaColor: '#fff',
                    borderColor: 'rgba(0,0,0,0.5)'
                }
            }
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'geo',
            pointSize: 15,
            blurSize: 15,
            roam: false,
            mapLocation: {
                y: 60
            },
            data: mapData.map(function (itemOpt) {
                return {
                    value: [
                        itemOpt.lon,
                        itemOpt.lat,
                        itemOpt.val
                    ]
                };
            }),
            progressive: 2000
        }
    });

    var histogram = echarts.init($('#histogram')[0]);

    histogram.setOption({
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'value',
            scale: true,
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
            show: false
        }],
        series: [{
            type: 'line',
            step : 'middle',
            showSymbol: false,
            lineStyle: {
                color: '#111',
                width: 0.5
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                        offset: 0,
                        color: '#313695'
                    },
                    {
                        offset: 0.09,
                        color: '#4575b4'
                    },
                    {
                        offset: 0.18,
                        color: '#74add1'
                    },
                    {
                        offset: 0.27,
                        color: '#abd9e9'
                    },
                    {
                        offset: 0.36,
                        color: '#e0f3f8'
                    },
                    {
                        offset: 0.45,
                        color: '#ffffbf'
                    },
                    {
                        offset: 0.54,
                        color: '#fee090'
                    },
                    {
                        offset: 0.63,
                        color: '#fdae61'
                    },
                    {
                        offset: 0.72,
                        color: '#f46d43'
                    },
                    {
                        offset: 0.81,
                        color: '#d73027'
                    },
                    {
                        offset: 1,
                        color: '#a50026'
                    }
                ])
            },
            label: {
                normal: {
                    show: true,
                    position: 'insideTop',
                    formatter: function (params) {
                        return params.value[1];
                    }
                }
            },
            data: bins2.data
        }]
    });
});