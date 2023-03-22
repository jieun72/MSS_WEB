$(document).ready(function(){

    var rainResultList = "";
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

    // 현재시간으로 강수량 검색
    searchMap(datetime);

    console.log(rainResultList);

    var mapData = [
        {'lat':37.565717, 'lng':126.976971, 'val':13, 'radius':10},
        {'lat':37.548316, 'lng':127.06037, 'val':6, 'radius':10},
        {'lat':37.59384, 'lng':127.075298, 'val':33, 'radius':10},
        {'lat':37.656185, 'lng':127.039009, 'val':22, 'radius':10},
        {'lat':37.609491, 'lng':126.930682, 'val':17, 'radius':10},
        {'lat':37.569195, 'lng':126.915256, 'val':42, 'radius':30},
        {'lat':37.555278, 'lng':126.93805, 'val':2, 'radius':10},
        {'lat':37.522056, 'lng':126.890612, 'val':3, 'radius':10},
        {'lat':37.483125, 'lng':126.901416, 'val':49.9, 'radius':10},
        {'lat':37.505908, 'lng':127.003438, 'val':0.2, 'radius':20},
        {'lat':37.516365, 'lng':127.020339, 'val':6, 'radius':10},
        {'lat':37.516614, 'lng':127.131325, 'val':13, 'radius':10},
        {'lat':37.67790008, 'lng':127.00328, 'val':21, 'radius':20}
    ];

    var testData = {
        max: 50,
        data: mapData
    };

    var cfg = {
        "radius": 'radius',
        "maxOpacity": .5,
        "scaleRadius": true,
        "scaleRadius": false,
        "useLocalExtrema": true,
        latField: 'lat',
        lngField: 'lng',
        valueField: 'val'
    };

    var heatmapLayer = new HeatmapOverlay(cfg).addTo(map);

    heatmapLayer.setData(testData);


    var theLegend = L.control({
        position: 'topright'
    });

    theLegend.onAdd = function(map) {

        var div = L.DomUtil.create('div', 'legend');
        div.style.width = '150px';
        div.innerHTML += "<h4>강수량(단위)</h4>";
        div.innerHTML += '<i style="background:'+ getColor(1) +'"></i><span>0 ~ 0.05</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(2) +'"></i><span>0.05 ~ 0.1</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(3) +'"></i><span>0.1 ~ 0.5</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(4) +'"></i><span>0.5 ~ 1</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(5) +'"></i><span>1 ~ 2</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(6) +'"></i><span>2 ~ 3</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(7) +'"></i><span>3 ~ 4</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(8) +'"></i><span>4 ~ 5</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(9) +'"></i><span>5 ~ 6</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(10) +'"></i><span>6 ~ 7</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(11) +'"></i><span>7 ~ 8</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(12) +'"></i><span>8 ~ 9</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(13) +'"></i><span>9 ~ 10</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(14) +'"></i><span>10 ~ 15</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(15) +'"></i><span>15 ~ 20</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(16) +'"></i><span>20 ~ 25</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(17) +'"></i><span>25 ~ 30</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(18) +'"></i><span>30 ~ 40</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(19) +'"></i><span>40 ~ 50</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(20) +'"></i><span>50 ~ 60</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(21) +'"></i><span>60 ~ 70</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(22) +'"></i><span>70 ~ 90</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(23) +'"></i><span>90 ~ 110</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(24) +'"></i><span>110 ~ 150</span><br>';
        div.innerHTML += '<i style="background:'+ getColor(25) +'"></i><span>150 ~ </span><br>';

        return div;
    };
    theLegend.addTo(map);

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

    datetime = datetime.substr(0,19);

    $("#timeVal").val(datetime);
    rainResultList = "";

    $.ajax({
        url: "/monitoring/findRainResultList",
        type: "GET",
        data: $("#searchForm").serialize()
    }).done(function (data, textStatus, jqXHR) {
        rainResultList = data.rainResultList;

    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(textStatus + jqXHR);
    });

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

/* 강수량 별 색 지정 */
function getColor(rainResult) {
    switch (rainResult) {
        case 1:
            return 'rgba(0,0,0,0)';
        case 2:
            return 'rgba(0,200,255,255)';
        case 3:
            return 'rgba(0,155,245,255)';
        case 4:
            return 'rgba(0,74,245,255)';
        case 5:
            return 'rgba(0,255,0,255)';
        case 6:
            return 'rgba(0,190,0,255)';
        case 7:
            return 'rgba(0,140,0,255)';
        case 8:
            return 'rgba(0,90,0,255)';
        case 9:
            return 'rgba(255,255,0,255)';
        case 10:
            return 'rgba(255,220,31,255)';
        case 11:
            return 'rgba(249,205,0,255)';
        case 12:
            return 'rgba(224,185,0,255)';
        case 13:
            return 'rgba(204,170,0,255)';
        case 14:
            return 'rgba(255,102,0,255)';
        case 15:
            return 'rgba(255,50,0,255)';
        case 16:
            return 'rgba(210,0,0,255)';
        case 17:
            return 'rgba(180,0,0,255)';
        case 18:
            return 'rgba(224,169,255,255)';
        case 19:
            return 'rgba(201,105,255,255)';
        case 20:
            return 'rgba(179,41,255,255)';
        case 21:
            return 'rgba(147,0,228,255)';
        case 22:
            return 'rgba(179,180,222,255)';
        case 23:
            return 'rgba(76,78,177,255)';
        case 24:
            return 'rgba(0,3,144,255)';
        case 25:
            return 'rgba(51,51,51,255)';
        default:
            return 'white';
    }
}
