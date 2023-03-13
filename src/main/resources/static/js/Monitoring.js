$(document).ready(function(){

    var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);

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

    // leaflet을 이용한 지도 생성
    var map = L.map('mapArea', {
        zoom: 12,
        center: [37.56, 127],
        timeDimension: true,
        timeDimensionControl: true,
        timeDimensionControlOptions: {
            playerOptions: {
                transitionTime: 1000, startOver: true
            },
        }
    });
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attributionControl: false,
        maxZoom: 15,
        minZoom: 7
    }).addTo(map);

    // 테스트마커+테스트팝업
/*    L.marker([37.56, 127]).addTo(map)
        .bindPopup('테스트 팝업')
        .openPopup();*/

    // 현재시각 표시
    var datetime = $("#timeVal").val();
    $("#nowTime").text(datetime.substr(0,4)+"년"+datetime.substr(5,2)+"월"+datetime
        .substr(8,2)+"일 "+datetime.substr(11,2)+"시"+datetime.substr(14,2)+"분");
    searchMakers(datetime);

    // TODO:지도 마커 검색


    // 차트 초기화
/*    let dataArr = [
        ['2023-03-10 13:40:00', 13],
        ['2023-03-10 13:50:00', 6],
        ['2023-03-10 14:00:00', 27]]

    setChart('강수 예측', dataArr);*/


    // TODO: 검색 로직2-선택 지점

    // 현재시간 클릭 시 화면 초기화
    $(document).on('click', '#searchButton', function(){
        refresh();
    });

    if(isTouchDevice) {
        // TODO: (모바일전용) 위치정보 받아오기

        // TODO: (모바일전용) 실시간 알림 제공
    }

});

/* 지도마커 검색 */
function searchMakers(datetime) {
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