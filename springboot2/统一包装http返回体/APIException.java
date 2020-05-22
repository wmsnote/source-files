package com.boe.retail.crmses.common.common;

import lombok.Getter;

/**
 * @author user
 * @date 2020/5/22 上午9:06
 */
public class APIException extends RuntimeException {


    @Getter
    private int errorCode;

    @Getter
    private String errorMessage;

    public APIException(int errorCode, String errorMessage){
        super(errorMessage);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public APIException(Throwable cause, int errorCode, String errorMessage){
        super(errorMessage, cause);
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
    }
}
