package com.mss.service;

import com.mss.vo.ResponseRainVO;

import java.util.List;

/**
 * author         : Jieun Lee
 * date           : 2023/03/22
 * description    : 강수 모니터링 화면 service
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/03/22        Jieun Lee          최초 생성
 */
public interface MonitoringService {

    /*
     * 모니터링 화면 강수 검색
     * @param String datetime
     * @return List<ResponseRainVO>
     * */    
    List<ResponseRainVO> searchRainResult(String datetime) throws Exception;

    /*
    * 모니터링 화면 실시간 알람 검색
    * @param float lat
    * @param float lon
    * @param String datetime
    * @return Integer */
    Integer searchAlert(float lat, float lon, String datetime) throws Exception;
}
