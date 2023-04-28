package com.mss.repository;

import com.mss.embed.RainBaseKey;
import com.mss.entity.RainBase;
import com.mss.vo.ResponseRainVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * author         : Jieun Lee
 * date           : 2023/03/22
 * description    : 강수 모니터링 화면 repository
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/03/22        Jieun Lee          최초 생성
 */
@Repository
public interface MonitoringRepository extends JpaRepository<RainBase, RainBaseKey> {
    @Query(value =
            "select " +
            "   a.base_time as baseTime, " +
            "   a.stn_id as stnId, " +
            "   b.lat as lat, " +
            "   b.lon as lon, " +
            "   b.expand_area as expandArea, " +
            "   case when a.seq = 1 then a.base_time " +
                    "when a.seq = 2 then a.base_time + interval '10 min' " +
                    "when a.seq = 3 then a.base_time + interval '20 min' " +
                    "when a.seq = 4 then a.base_time + interval '30 min' " +
                    "when a.seq = 5 then a.base_time + interval '40 min' " +
                    "when a.seq = 6 then a.base_time + interval '50 min' " +
                    "when a.seq = 7 then a.base_time + interval '60 min' " +
                    "when a.seq = 8 then a.base_time + interval '70 min' " +
                    "when a.seq = 9 then a.base_time + interval '80 min' " +
                    "when a.seq = 10 then a.base_time + interval '90 min' " +
                    "when a.seq = 11 then a.base_time + interval '100 min' " +
                    "when a.seq = 12 then a.base_time + interval '110 min' " +
                    "when a.seq = 13 then a.base_time + interval '120 min' " +
                    "when a.seq = 14 then a.base_time + interval '130 min' " +
                    "when a.seq = 15 then a.base_time + interval '140 min' " +
                    "when a.seq = 16 then a.base_time + interval '150 min' " +
                    "when a.seq = 17 then a.base_time + interval '160 min' " +
                    "when a.seq = 18 then a.base_time + interval '170 min' " +
                    "when a.seq = 19 then a.base_time + interval '180 min' " +
                    "else a.base_time " +
                    "end as fcstTime, "+
            "   a.rain_result as rainResult " +
            "from \"TB_RAIN_FCST\" a " +
            "inner join \"TB_STN_INFO\" b " +
            "on a.stn_id = b.stn_id " +
            "where a.base_time = to_timestamp(:datetime, 'YYYY-MM-DD HH24:MI') ",
            nativeQuery = true
    )
    List<ResponseRainVO> findRainResult(@Param("datetime") final String datetime);


    @Query(value =
            "select max(alert) from (select" +
            "   case when bs.rain_result >= 21 then " +
                    "case when bs.rain_result >= 23 then 2 " +
                    "else 1 " +
                    "end " +
            "   else 0 " +
            "   end as alert " +
            "from " +
            "   ( " +
            "   select " +
            "       trf.stn_id , " +
            "       trf.rain_result, " +
            "       st_distance( " +
            "           st_makepoint(tsi.lon, tsi.lat), " +
            "           st_makepoint(:lon, :lat)) as dist " +
            "   from " +
            "       \"TB_RAIN_FCST\" trf " +
            "   inner join \"TB_STN_INFO\" tsi on " +
            "       trf.stn_id = tsi.stn_id " +
            "   where " +
            "       trf.base_time = to_timestamp(:datetime, 'YYYY-MM-DD HH24:MI') " +
            "   order by " +
            "       dist asc " +
            "   limit 1 " +
            ") as bs) as ms ",
            nativeQuery = true
    )
    Integer findAlert(@Param("lat") final float lat, @Param("lon") final float lon, @Param("datetime") final String datetime);
}
