package com.mss.controller;

import com.mss.form.MonitoringForm;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/monitoring")
public class MonitoringController {

    /* 화면 초기화 */
    @RequestMapping(method = RequestMethod.GET)
    public String init(final MonitoringForm searchForm, Model model) throws Exception {

        Date now = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String nowTime = sdf.format(now);

        searchForm.setSearchDate(nowTime);

        model.addAttribute(searchForm);

        return "Monitoring";
    }
}
