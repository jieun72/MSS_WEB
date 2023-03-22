package com.mss.vo;

public interface ResponseRainVO {

    /* 기준시간 */
    String getBaseTime();

    /* 측정소 */
    String getStnId();

    /* 위도 */
    Double getLat();

    /* 경도 */
    Double getLon();

    /* radius */
    Integer getExpandArea();

    /* 예측시간 */
    String getFcstTime();

    /* 강수량 */
    Double getRainResult();
}
