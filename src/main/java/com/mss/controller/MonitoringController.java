package com.mss.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/monitoring")
public class MonitoringController {

    @Value("${kakao.apikey}")
    private String apiKey;

    /* 화면 초기화 */
    @RequestMapping(method = RequestMethod.GET)
    public String init(final Model model) throws Exception {

        String mapKey = "http://dapi.kakao.com/v2/maps/sdk.js?appkey=" + apiKey + "&libraries=services,clusterer,drawing";

        // TODO: 현재시각 설정
        model.addAttribute("nowTime", "2023-03-07 13:00:00");
        model.addAttribute("mapKey", mapKey);

        return "Monitoring";
    }
}
