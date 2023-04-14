$(document).ready(function(){
    
    var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
    var datetime = $("#timeVal").val();

    $("#alertArea").hide();

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

    // TODO:테스트용 데이터(추후삭제)
    // leaflet을 이용한 지도 생성
    var map = L.map('mapArea', {
        zoom: 12,
        center: [37.56, 127],
        crs: L.CRS.EPSG3857,
        timeDimension: true,
        timeDimensionControl: true,
        timeDimensionOptions: {
            timeInterval: "2022-12-01 03:10:00 / 2022-12-01 06:10:00",
            // timeInterval: currentTime.toISOString() +"/" + endDate.toISOString(),
            period: "PT10M",
            currentTime: "2022-12-01 03:10:00"
            // currentTime: currentTime.getTime()
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
    datetime = datetime.substr(0,19);

    $("#timeVal").val(datetime);

    $.ajax({
        url: "/monitoring/findRainResultList",
        type: "GET",
        data: $("#searchForm").serialize()
    }).done(function (data, textStatus, jqXHR) {

        var timeSeriesGeoJSON = data.jsonResult;

        function style(feature) {
            return {
                opacity: 1,
                radius: feature.properties.radius,
                color: 'rgba(0,0,0,0)',
                fillOpacity: 1,
                fillColor: getColor(feature.properties.rainresult)
            };
        }

        var timeSeriesLayer = L.geoJSON(JSON.parse(timeSeriesGeoJSON), {pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, style(feature));
            }});

        var geojson = L.timeDimension.layer.geoJson(timeSeriesLayer);

        geojson.addTo(map);


    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(textStatus + jqXHR);
    });

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
        // (모바일전용) 위치정보 버튼
        L.control.locate().addTo(map);

        // TODO: (모바일전용) 실시간 알림 제공
        function onLocationFound(e) {
            var latlng = e.latlng;
            console.log(latlng.lat);
            console.log(latlng.lng);
            $.ajax({
                url: "/monitoring/searchWarning",
                type: "GET",
                data: { "lat" : latlng.lat, "lon" : latlng.lng, "datetime" : datetime }
            }).done(function (data, textStatus, jqXHR) {

                $("#alertArea").hide();
                var warningResult = data.warningResult;
                if(warningResult == 1) {
                    $("#alertArea").show();
                    $("#alertArea").removeClass("alert-danger");
                    $("#alertArea").addClass("alert-warning");

                    var contentHtml = '<strong>호우 주의보 발생 중!</strong> 많은 비가 예상되니 외출자제 등 안전에 주의바랍니다.</span>'
                    $("#alertContent").html(contentHtml);
                } else if(warningResult == 2) {
                    $("#alertArea").show();
                    $("#alertArea").removeClass("alert-warning");
                    $("#alertArea").addClass("alert-danger");

                    var contentHtml = '<strong>호우 경보 발생 중!</strong> 산사태·상습침수 등 위험지역 대피, 외출자제 등 안전에 주의바랍니다.</span>'
                    $("#alertContent").html(contentHtml);
                }

            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(textStatus + jqXHR);
            });
        }
    }

    map.on('locationfound', onLocationFound);
});

/* 화면 초기화 */
function refresh() {
    window.location.reload();
}

/* 강수량 별 색 지정 */
function getColor(rainResult) {
    switch (rainResult) {
        case 1:
            return 'rgba(255,255,255,255)';
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
            return 'rgba(0,0,0,0)';
    }
}
