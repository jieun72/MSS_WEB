package com.mss.controller;

import com.mss.form.MonitoringForm;
import com.mss.service.MonitoringService;
import com.mss.vo.ResponseRainVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/monitoring")
public class MonitoringController {

    /* 강수 모니터링 화면 service */
    private final MonitoringService monitoringService;

    /*
     * GET 리퀘스트 (화면 초기화)
     * @param MonitoringForm searchForm
     * @param Model model
     * @retuen String 화면명
     * @throws Exception 예외
     * */
    @RequestMapping(method = RequestMethod.GET)
    public String init(final MonitoringForm monitoringForm, Model model) throws Exception {

        Date now = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:00.000Z");
        String nowTime = sdf.format(now);

        StringBuilder sb = new StringBuilder(nowTime);
        sb.setCharAt(15, '0');
        nowTime = sb.toString();

        monitoringForm.setSearchDate(nowTime);

        model.addAttribute(monitoringForm);

        return "Monitoring";
    }

    /*
     * GET 리퀘스트 (강수량 검색)
     * @param MonitoringForm searchForm
     * @param Model model
     * @return MonitoringForm searchForm
     * @throws Exception 예외
     * */
    @RequestMapping(method = RequestMethod.GET, value = "/findRainResultList")
    public @ResponseBody
    MonitoringForm searchRainResult(
            final MonitoringForm searchForm,
            final Model model) throws Exception {

        // 강수량 검색
        String searchDate = searchForm.getSearchDate();
        searchDate = "2022-12-01 03:10:00";
        List<ResponseRainVO> rainResult = this.monitoringService.searchRainResult(searchDate);
        searchForm.setRainResultList(rainResult);
        model.addAttribute(searchForm);

        return searchForm;
    }
}
