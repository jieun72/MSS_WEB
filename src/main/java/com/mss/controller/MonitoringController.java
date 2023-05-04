package com.mss.controller;

import com.mss.form.MonitoringForm;
import com.mss.service.MonitoringService;
import com.mss.vo.ResponseRainVO;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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

        List<ResponseRainVO> rainResult = this.monitoringService.searchRainResult(searchDate);
        searchForm.setRainResultList(rainResult);

        String jsonArray = this.makeJson(rainResult);
        searchForm.setJsonResult(jsonArray);

        model.addAttribute(searchForm);
        return searchForm;
    }

    /*
     * GET 리퀘스트 (강수 예보 알람 표시)
     * @param String lat
     * @param String lon
     * @param Model model
     * @return MonitoringForm searchForm
     * @throws Exception 예외
     * */
    @RequestMapping(method = RequestMethod.GET, value = "/searchWarning")
    public @ResponseBody
    MonitoringForm searchWarning(
            @RequestParam("lat") float lat, @RequestParam("lon") float lon,
            @RequestParam("datetime") String datetime,
            final Model model) throws Exception {

        Integer warningResult = this.monitoringService.searchAlert(lat, lon, datetime);

        MonitoringForm searchForm = new MonitoringForm();
        searchForm.setWarningResult(warningResult);

        model.addAttribute(searchForm);
        return searchForm;
    }

    /*
    * JSON 형식 변환
    * @param List<ResponseRainVO> listData
    * @return String returnJson
    * */
    private String makeJson(List<ResponseRainVO> listData) {
        String returnJson = "";

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("type", "FeatureCollection");

        JSONArray featureArray = new JSONArray();

        for(int i=0; i<listData.size(); i++) {

            JSONObject feautres = new JSONObject();
            JSONObject properties = new JSONObject();
            JSONObject geometry = new JSONObject();
            JSONArray coordiArray = new JSONArray();

            coordiArray.add(listData.get(i).getLon());
            coordiArray.add(listData.get(i).getLat());

            properties.put("stnId", listData.get(i).getStnId());
            properties.put("time", listData.get(i).getFcstTime());
            properties.put("rainresult", listData.get(i).getRainResult());
            properties.put("radius", listData.get(i).getExpandArea());

            geometry.put("type", "Point");
            geometry.put("coordinates", coordiArray);

            feautres.put("type", "Feature");
            feautres.put("id", i+1);
            feautres.put("properties", properties);
            feautres.put("geometry", geometry);
            featureArray.add(feautres);

            jsonObject.put("features", featureArray);

        }

        returnJson = jsonObject.toString();

        return returnJson;
    }
}
