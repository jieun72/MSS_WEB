$(document).ready(function(){

    var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
    var datetime = $("#timeVal").val();

    // 웹-모바일 화면구성
    if(!isTouchDevice) {
        // PC
        $("#mapArea").addClass("mapArea");
        $("#infoArea").addClass("infoArea");
        $("#mapArea").removeClass("mapAreaMobile");
        $("#infoArea").removeClass("infoAreaMobile");
    } else {
        // mobile
        $("#mapArea").removeClass("mapArea");
        $("#infoArea").removeClass("infoArea");
        $("#mapArea").addClass("mapAreaMobile");
        $("#infoArea").addClass("infoAreaMobile");
    }

    var currentTime = new Date(datetime);
    var endDate = new Date(currentTime.getTime());
    L.TimeDimension.Util.addTimeDuration(endDate, "PT3H", true);

    // leaflet을 이용한 지도 생성
    var map = L.map('mapArea', {
        zoom: 12,
        center: [37.56, 127],
        crs: L.CRS.EPSG3857,
        timeDimension: true,
        timeDimensionControl: true,
        timeDimensionOptions: {
            timeInterval: currentTime.toISOString() +"/" + endDate.toISOString(),
            period: "PT10M",
            currentTime: currentTime.getTime()
        },
        timeDimensionControlOptions: {
            playerOptions: {
                transitionTime: 1000,
                startOver: true
            },
            loopButton: false,
            autoPlay: false,
            timeZones: ["Local"]
        }
    });

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attributionControl: false,
        maxZoom: 15,
        minZoom: 7
    }).addTo(map);

    // 현재시각 표시
    $("#nowTime").text(datetime.substr(0,4)+"년"+datetime.substr(5,2)+"월"+datetime
        .substr(8,2)+"일 "+datetime.substr(11,2)+"시"+datetime.substr(14,2)+"분");

    // TODO:시간으로 지도 검색
    searchMap(datetime);

/*
    // Add image layer
    var imageUrl = 'https://www.socib.es/users/mobims/imageArchive/clm/sirena/clm/c04/2014/01/11/clm_s_04_2014-01-01-12-00.png';
    var imageBounds = [[38.69, 1.1675], [38.71, 1.1325]];

    var imageLayer = L.imageOverlay(imageUrl, imageBounds, {
        opacity: 0.5
    });

    var getSirenaImageUrl = function(baseUrl, time) {
        var beginUrl = baseUrl.substring(0, baseUrl.lastIndexOf("/") - 10);
        beginUrl = beginUrl + new Date(time).format('yyyy/mm/dd');
        var strTime = new Date(time).format('yyyy-mm-dd-HH-MM');
        var initFileUrl = baseUrl.substring(baseUrl.lastIndexOf("/"), baseUrl.length - 20);
        url = beginUrl + initFileUrl + strTime + '.png';
        return url;
    };

    var testImageTimeLayer = L.timeDimension.layer.imageOverlay(imageLayer, {
        getUrlFunction: getSirenaImageUrl
    });
    testImageTimeLayer.addTo(map);*/

    var mapData = [
        {'lat':37.565717, 'lng':126.976971, 'val':13},
        {'lat':37.548316, 'lng':127.06037, 'val':6},
        {'lat':37.59384, 'lng':127.075298, 'val':33},
        {'lat':37.656185, 'lng':127.039009, 'val':22},
        {'lat':37.609491, 'lng':126.930682, 'val':17},
        {'lat':37.569195, 'lng':126.915256, 'val':42},
        {'lat':37.555278, 'lng':126.93805, 'val':2},
        {'lat':37.522056, 'lng':126.890612, 'val':3},
        {'lat':37.483125, 'lng':126.901416, 'val':49.9},
        {'lat':37.505908, 'lng':127.003438, 'val':0.2},
        {'lat':37.516365, 'lng':127.020339, 'val':6},
        {'lat':37.516614, 'lng':127.131325, 'val':13},
        {'lat':37.67790008, 'lng':127.00328, 'val':21}
    ];

    var testData = {
        max: 50,
        data: mapData
    };

    var cfg = {
        //"radius": 2,
        "radius": 50,
        "maxOpacity": .5,
        //"scaleRadius": true,
        "scaleRadius": false,
        "useLocalExtrema": true,
        latField: 'lat',
        lngField: 'lng',
        valueField: 'val'
    };

    var heatmapLayer = new HeatmapOverlay(cfg).addTo(map);

    heatmapLayer.setData(testData);

    // 현재시간 클릭 시 화면 초기화
    $(document).on('click', '#searchButton', function(){
        refresh();
    });

    if(isTouchDevice) {
        // TODO: (모바일전용) 위치정보 받아오기

        // TODO: (모바일전용) 실시간 알림 제공
    }
});

/* 시간으로 지도 검색 */
function searchMap(datetime) {
    console.log(datetime);
    // TODO:지도마커 검색+지도에 표시
}

/* 화면 초기화 */
function refresh() {
    window.location.reload();
}

/* 차트 작성 */
function setChart(title, dataArr) {

    var theme = {
        color: [
            '#26B99A', '#34495E', '#3498DB', '#BDC3C7',
            '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7'
        ],

        title: {
            x: 'center',
            y: 'top',
            itemGap: 20,
            textStyle: {
                fontWeight: 'bolder',
                fontsize: 20
            }
        },

        dataRange: {
            color: ['#1f610a', '#97b58d', '#bfd3b7', '#ffffff']
        },

        toolbox: {
            color: ['#408829', '#408829', '#408829', '#408829']
        },

        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: '#408829',
                    type: 'dashed'
                },
                crossStyle: {
                    color: '#408829'
                },
                shadowStyle: {
                    color: 'rgba(200,200,200,0.3)'
                }
            }
        },

        grid: {
            borderWidth: 0
        },

        categoryAxis: {
            axisLine: {
                lineStyle: {
                    color: 'rgba(0,0,0,0.5)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: ['#eee']
                }
            }
        },

        valueAxis: {
            axisLine: {
                lineStyle: {
                    color: 'rgba(0,0,0,0.5)'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                }
            },
            splitLine: {
                lineStyle: {
                    color: ['#eee']
                }
            }
        },
        textStyle: {
            fontFamily: 'Arial, Verdana, sans-serif'
        }
    };

    var echartLine = echarts.init($('#chartArea')[0], theme);

    window.onresize = function() {
        echartLine.resize();
    };

    echartLine.setOption({
        title: {
            text: title
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                color: '#FFF'
            }
        },
        legend: {
            x: 220,
            y: 40,
            data: ['강수예측']
        },
        toolbox: {
            show: true,
            feature: {
                magicType: {
                    show: true,
                    title: {
                        line: 'Line',
                        bar: 'Bar',
                    },
                    type: ['line', 'bar']
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
        calculable: true,
        xAxis: [{
            type: 'category',
            name: '예측날짜',
            boundaryGap: false,
            nameLocation: 'middle',
            nameGap: 25,
        }],
        yAxis: [{
            type: 'value',
            name: '강수확률(%)',
            nameLocation: 'middle',
            nameGap: 50,
            axisLabel: {
                formatter: '{value}'
            }
        }],
        series: [{
            name: '강수예측',
            type: 'line',
            smooth: true,
            data: dataArr
        }]
    });
}