package com.boe.retail.ses.config;

import com.boe.retail.crmses.common.common.APIResponse;
import com.boe.retail.crmses.common.common.NoAPIResponse;
import com.boe.retail.crmses.common.util.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import static com.boe.retail.crmses.common.common.APIResponse.of;
import static com.boe.retail.crmses.common.common.ResultEnum.SUCCESS;

/**
 * @author user
 * @date 2020/5/22 上午9:12
 */
@Slf4j
@RestControllerAdvice
public class APIResponseAdvice implements ResponseBodyAdvice<Object> {


    //仅当方法或类没有标记@NoAPIResponse才自动包装
    @Override
    public boolean supports(MethodParameter returnType,  Class<? extends HttpMessageConverter<?>> converterType) {
        boolean notAPIResponseInstance = returnType.getParameterType() != APIResponse.class;
        boolean methodAnnotationNull = AnnotationUtils.findAnnotation(returnType.getMethod(), NoAPIResponse.class) == null;
        boolean classAnnotationNull = AnnotationUtils.findAnnotation(returnType.getDeclaringClass(), NoAPIResponse.class) == null;
        return notAPIResponseInstance && methodAnnotationNull && classAnnotationNull;
    }

    //自动包装外层APIResposne响应
    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
                                  Class<? extends HttpMessageConverter<?>> selectedConverterType,
                                  ServerHttpRequest request, ServerHttpResponse response) {

        //如果直接返回字符串,这里的mediatype是text/plain
        //StringHttpMessageConverter会直接把字符串写入body, 所以字符串特殊处理

//        if(MediaType.APPLICATION_JSON.equals(selectedContentType)){ // 判断响应的Content-Type为JSON格式的body
//            return of(body, SUCCESS);
//        }
//        if(body instanceof String){
//            return JsonUtil.toJson(of(body, SUCCESS));
//        }
//
//        return body;

        if (selectedConverterType == StringHttpMessageConverter.class) {
            response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
            return JsonUtil.toJson(of(body, SUCCESS));
        }
        return of(body, SUCCESS);


    }





}
