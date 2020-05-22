package com.boe.retail.ses.config;

import com.boe.retail.crmses.common.common.APIException;
import com.boe.retail.crmses.common.common.APIResponse;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.engine.path.PathImpl;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static com.boe.retail.crmses.common.common.APIResponse.of;

/**
 * @author user
 * @date 2020/5/22 上午9:12
 */
@Slf4j
@RestControllerAdvice
public class APIExceptionAdvice {

    //自动处理APIException，包装为APIResponse
    @ExceptionHandler(APIException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public APIResponse handleApiException(HttpServletRequest request, APIException ex) {
        log.error("process url {} failed", request.getRequestURL().toString(), ex);
        return of(null, ex.getMessage(), ex.getErrorCode());
    }

    /**
     * API不存在
     */
    @ExceptionHandler(value = {NoHandlerFoundException.class})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public APIResponse<Object> noHandlerFoundException(HttpServletRequest req, Exception e) {

        log.warn(String.format("请求路径 [ %s ] 不存在", req.getRequestURI()), e);
        return APIResponse.of(null, "接口不存在", 404);
    }


    /**
     * 参数绑定校验错误
     */

    @ExceptionHandler(value= {MethodArgumentNotValidException.class, BindException.class})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public APIResponse<Object> handleVaildException(HttpServletRequest req, HandlerMethod method, Exception ex){

        log.warn(String.format("=== %s -> %s params bind not valid", req.getRequestURI(), method.toString()), ex);

        BindingResult bindingResult = null;
        if (ex instanceof MethodArgumentNotValidException) {
            bindingResult = ((MethodArgumentNotValidException)ex).getBindingResult();
        } else if (ex instanceof BindException) {
            bindingResult = ((BindException)ex).getBindingResult();
        }
        Map<String,String> errorMap = new HashMap<>(16);
        Optional.ofNullable(bindingResult).ifPresent(br -> br.getFieldErrors().forEach(fieldError -> errorMap.put(fieldError.getField(),fieldError.getDefaultMessage())));



        return APIResponse.of(errorMap , "非法参数 !" , 400);
    }

    /**
     * 缺失请求参数
     */
    @ExceptionHandler(value = MissingServletRequestParameterException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Object missingServletRequestParameterException(HttpServletRequest req, HandlerMethod method, MissingServletRequestParameterException ex) {
        log.warn(String.format("=== %s -> %s : miss servlet request parameter", req.getRequestURI(), method.toString()), ex);
        return APIResponse.of(null, "请求参数有误", 400);
    }
    /**
     * 方法参数校验错误
     */
    @ExceptionHandler(value = ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Object constraintViolationException(HttpServletRequest req, HandlerMethod method, ConstraintViolationException ex) {
        log.warn(String.format("=== %s -> %s : method params validate err", req.getRequestURI(), method.toString()), ex);
        Set<ConstraintViolation<?>> violations = ex.getConstraintViolations();
        for (ConstraintViolation<?> item : violations) {
            String message = ((PathImpl) item.getPropertyPath()).getLeafNode().getName()+ ":" + item.getMessage();
            return APIResponse.of(null, "请求参数有误: " + message, 400);
        }


        return APIResponse.of(null, "请求参数有误: " + ex.getMessage(), 400);
    }



    // 捕捉其他所有异常
    @ExceptionHandler(value = {Exception.class, Throwable.class})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public APIResponse<Object> throwable(HttpServletRequest request, HandlerMethod method, Throwable ex) {
        log.warn(String.format("=== %s -> %s : ", request.getRequestURI(), method.toString()), ex);
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");

        return APIResponse.of(null, ex.getMessage(), statusCode == null ? 500 : statusCode);
    }

}
