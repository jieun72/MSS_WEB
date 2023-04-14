package com.mss.service;

import com.mss.repository.MonitoringRepository;
import com.mss.vo.ResponseRainVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
@RequiredArgsConstructor
@Service
public class MonitoringServiceImpl implements MonitoringService{

    private final MonitoringRepository monitoringRepository;

    @Override
    public List<ResponseRainVO> searchRainResult(String datetime) throws Exception {
        List<ResponseRainVO> resultList = this.monitoringRepository.findRainResult(datetime);
        return resultList;
    }

    @Override
    public Integer searchAlert(float lat, float lon, String datetime) throws Exception {
        Integer returnVal = this.monitoringRepository.findAlert(lat, lon, datetime);
        return returnVal;
    }


}
