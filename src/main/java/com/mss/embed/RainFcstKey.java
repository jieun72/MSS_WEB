package com.mss.embed;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * author         : Jieun Lee
 * date           : 2023/03/22
 * description    : 강수 예측 테이블 PK
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/03/22        Jieun Lee          최초 생성
 */
@Embeddable
@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RainFcstKey implements Serializable {

    /* 예측순서 */
    @Column(name = "`seq`", nullable = false)
    private String seq;

    /* 기준날짜 */
    @Column(name = "`base_time`", nullable = false)
    private String baseTime;

    /* 측정소 */
    @Column(name = "stn_id", nullable = false)
    private int stnId;

}
