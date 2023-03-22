package com.mss.entity;

import com.mss.embed.RainFcstKey;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * author         : Jieun Lee
 * date           : 2023/03/22
 * description    : 강수 예측 테이블 Entity
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/03/22        Jieun Lee          최초 생성
 */
@Entity
@Table(schema = "mss", name = "\"TB_RAIN_FCST\"")
@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RainFcst {

    /* PK */
    @Type(type = "pg-uuid")
    @EmbeddedId
    private RainFcstKey rainFcstKey;

    /* 강수 예측 결과 */
    @Column(name = "rain_result")
    private int rainResult;

}
