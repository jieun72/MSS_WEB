package com.mss.form;

import com.mss.vo.ResponseRainVO;
import lombok.*;

import java.util.List;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonitoringForm {

    /* 검색조건-날짜 */
    private String searchDate;

    /* 검색결과-강수결과 */
    private List<ResponseRainVO> rainResultList;

}
