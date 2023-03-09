$(document).ready(function(){

    var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);

    // 웹-모바일 화면구성
    if(!isTouchDevice) {
        console.log("PC");
        $("#mapArea").addClass("mapArea");
        $("#infoArea").addClass("infoArea");
        $("#mapArea").removeClass("mapAreaMobile");
        $("#infoArea").removeClass("infoAreaMobile");
    } else {
        console.log("mobile");
        $("#mapArea").removeClass("mapArea");
        $("#infoArea").removeClass("infoArea");
        $("#mapArea").addClass("mapAreaMobile");
        $("#infoArea").addClass("infoAreaMobile");
    }

    // // kakao map 생성
    // var container = document.getElementById('mapArea');
    // var options = {
    //     center: new kakao.maps.LatLng(37.56, 127), // 서울시
    //     level: 8
    // };
    //
    // this.map = new kakao.maps.Map(container, options);
    // this.map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
    //
    // var zoomControl = new kakao.maps.ZoomControl();
    // this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // leaflet을 이용한 지도 생성
    var mymap = L.map('mapArea').setView([37.56, 127], 12);
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 15
    }).addTo(mymap);

    // TODO: 검색 로직1-지도마커

    // TODO: 검색 로직2-선택 지점
    
    // TODO: 초기화+화면새로쓰기
    
    
    // TODO: (모바일전용) 위치정보 받아오기
    
    // TODO: (모바일전용) 실시간 알림 제공
});