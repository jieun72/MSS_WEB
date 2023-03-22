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
    @Query(
            "select " +
            "   a.rainBaseKey.baseTime as baseTime, " +
            "   a.rainBaseKey.stnId as stnId, " +
            "   a.lat as lat, " +
            "   a.lon as lon, " +
            "   a.expandArea as expandArea, " +
            "   b.rainFcstKey.seq as fcstTime, " +
            "   b.rainResult as rainResult " +
            "from RainBase a " +
            "inner join RainFcst b " +
            "on a.rainBaseKey.baseTime = b.rainFcstKey.baseTime " +
            "and a.rainBaseKey.stnId = b.rainFcstKey.stnId " +
            "where a.rainBaseKey.baseTime = function('to_timestamp', :datetime, 'YYYY-MM-DD HH24:MI') "
    )
    List<ResponseRainVO> findRainResult(@Param("datetime") final String datetime);
}
