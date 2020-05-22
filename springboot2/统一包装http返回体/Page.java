package com.boe.retail.crmses.common.common;

import lombok.Data;

import java.util.List;

/**
 * @author user
 * @date 2020/5/20 下午4:53
 */
@Data
public class Page<T> {

    private Integer pageNo;

    private Integer pageCount;

    private Integer totalCount;

    private List<T> list;

    private Page(Integer pageNo, Integer pageSize, Integer totalCount, List<T> list){
        this.pageNo = pageNo;
        this.list = list;
        this.totalCount = totalCount;
        this.pageCount = (totalCount  - 1) / pageSize + 1;
    }

    public static <T> Page<T> newInstance(Integer pageNo, Integer pageSize, Integer totalCount, List<T> list){
        return new Page<>(pageNo, pageSize, totalCount, list);
    }


}
