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

    // TODO: kakao map 표시
    // TODO: 검색 로직1-지도마커

    // TODO: 검색 로직2-선택 지점
    
    // TODO: 초기화+화면새로쓰기
    
    
    // TODO: (모바일전용) 위치정보 받아오기
    
    // TODO: (모바일전용) 실시간 알림 제공
});