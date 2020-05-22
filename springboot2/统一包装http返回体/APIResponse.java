package com.boe.retail.crmses.common.common;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author user
 */
@Data
@AllArgsConstructor
public class APIResponse<T> {

    private T data;

    private String message;

    private Integer code;

    public static <T> APIResponse<T> of(T data, String msg, Integer code) {

        return new APIResponse<>(data, msg, code);
    }




    public static <T> APIResponse<T> of(T data, ResultEnum stateEnum) {

        return new APIResponse<>(data, stateEnum.getMessage(), stateEnum.getCode());
    }

}

