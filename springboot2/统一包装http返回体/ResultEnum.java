package com.boe.retail.crmses.common.common;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ResultEnum {

    SUCCESS(200, "success"),



    FILE_IS_NULL(4030, "file is null"),

    FILE_UPLOAD_FAIL(4130, "file upload fail");

    private Integer code;

    private String message;
}
