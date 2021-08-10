package com.greenart.service;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.greenart.mapper.CoronaInfoMapper;
import com.greenart.vo.CoronaInfoVO;
import com.greenart.vo.CoronaSidoInfoVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CoronaInfoService {
    @Autowired
    CoronaInfoMapper mapper;
    
    public void insertCoronaInfo(CoronaInfoVO vo) {
        mapper.insertCoronaInfo(vo);
    }
    public CoronaInfoVO selectTodayCoronaInfo() {
        // 10시 30분에 데이터를 입력하니깐
        // 10시 29분에는 이전 날의 데이터를 표시해야함
        // Calendar start = Calendar.getInstance();
        // Calendar end = Calendar.getInstance();
        
        // start.set(Calendar.HOUR_OF_DAY, 10);
        // start.set(Calendar.MINUTE, 30);
        // start.set(Calendar.SECOND, 0);
        
        // 2021-08-11 01:00:00 - 접속시간 -> 8월 11일 데이터가 없으므로 전 날 데이터를 뽑아줌
        // 2021-08-11 10:30:00 - 세팅값
        // 2021-08-11 14:00:00 - 접속시간 -> 8월 11일 데이터 뽑기 가능

        // 현재 시간이 세팅값보다 이전이라면 , 전 날 데이터를 뽑아주고
        // 현재 시간이 세팅값 이전이면 시간 데이터가 null로 표시 되기때문에 전날 데이터를 뽑음
        // 현재시간이 세팅값보다 나중이라면, 오늘 데이터를 뽑아준다.
        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String date = formatter.format(now);

        CoronaInfoVO data = mapper.selectCoronaInfoByDate(date);

        Integer accExamCnt = data.getAccExamCnt();
        Integer decideCnt = data.getDecideCnt();

        DecimalFormat dFormatter = new DecimalFormat("###,###");
        String strAccExamCnt = dFormatter.format(accExamCnt);
        String strDecideCnt = dFormatter.format(decideCnt);

        data.setStrAccExamCnt(strAccExamCnt);
        data.setStrDecideCnt(strDecideCnt);

        return data;
    }
    
    public void insertCoronaSidoInfo(CoronaSidoInfoVO vo) {
        mapper.insertCoronaSidoInfo(vo);
    }
    public CoronaSidoInfoVO selectTodayCoronaSidoInfo() {
        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String date = formatter.format(now);

        CoronaSidoInfoVO data = mapper.selectCoronaSidoInfoByDate(date);

        Integer isolClearCnt = data.getIsolClearCnt();

        DecimalFormat dFormatter = new DecimalFormat("###,###");
        String strIsolClearCnt = dFormatter.format(isolClearCnt);

        data.setStrIsolClearCnt(strIsolClearCnt);

        return data;
    }

}
