package com.greenart.vo;

import java.util.Date;

import lombok.Data;

@Data
public class CoronaAgeInfoVO {
    private Integer seq;
    private String gubun;
    private Integer confCase;
    private Integer death;
    private Double confCaseRate;
    private Double criticalRate;
    private Double deathRate;
    private Date createDt;
}
