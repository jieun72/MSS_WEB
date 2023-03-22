package com.mss.entity;

import com.mss.embed.RainBaseKey;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * author         : Jieun Lee
 * date           : 2023/03/22
 * description    : 강수 베이스 테이블 Entity
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/03/22        Jieun Lee          최초 생성
 */
@Entity
@Table(schema = "mss", name = "\"TB_RAIN_BASE\"")
@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RainBase {

    /* PK */
    @Type(type = "pg-uuid")
    @EmbeddedId
    private RainBaseKey rainBaseKey;

    /* 위도 */
    @Column(name = "lat")
    private double lat;

    /* 경도 */
    @Column(name = "lon")
    private double lon;

    /* radius */
    @Column(name = "expand_area")
    private int expandArea;

}
