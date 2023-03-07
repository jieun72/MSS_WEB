package com.mss.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/monitoring")
public class MonitoringController {

    /* 화면 초기화 */
    @RequestMapping(method = RequestMethod.GET)
    public String init(final Model model) throws Exception {

        // TODO: 현재시각 설정
        model.addAttribute("nowTime", "2023-03-07 13:00:00");

        return "Monitoring";
    }
}
