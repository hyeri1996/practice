package com.greenart.vo;

import java.util.Date;

import lombok.Data;

@Data
public class CoronaAgeInfoVO {
    private Integer seq;
    private String gubun;
    private Integer confCase;
    private Integer death;
    private Date createDt;
}
