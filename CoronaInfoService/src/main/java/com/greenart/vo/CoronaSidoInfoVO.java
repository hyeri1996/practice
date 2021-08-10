package com.greenart.vo;

import java.util.Date;

import lombok.Data;

@Data
public class CoronaSidoInfoVO {
    private Integer seq;
    private Date createDt;
    private Integer deathCnt;
    private Integer defCnt;
    private String gubun;
    private Integer incDec;
    private Integer isolClearCnt;
    private Integer isolIngCnt;
    private Integer localOccCnt;
    private Integer overFlowCnt;

    private String strDeathCnt;
    private String strDefCnt;
    private String strIncDec;
    private String strIsolClearCnt;
    private String strIsolIngCnt;
    private String strLocalOccCnt;
}
