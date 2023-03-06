package com.mss;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/monitoring")
public class MonitoringController {

    @RequestMapping(method = RequestMethod.GET)
    public String testController(final Model model) throws Exception {

        model.addAttribute("title", "테스트 화면");

        return "Monitoring";
    }
}
