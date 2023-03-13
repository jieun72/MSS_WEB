package com.mss.form;

import lombok.*;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonitoringForm {

    /* 검색조건-날짜 */
    private String searchDate;

    /* 검색조건-측정소 */
    private String stnId;



}
