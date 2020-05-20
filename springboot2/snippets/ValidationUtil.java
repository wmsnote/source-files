package com.boe.retail.crmses.common.util;

import org.apache.commons.collections.CollectionUtils;

import javax.validation.*;
import java.util.Set;

/**
 * @author user
 * @date 2020/5/20 上午10:09
 */
public class ValidationUtil {


    private static Validator validator;

    static {
        ValidatorFactory vf = Validation.buildDefaultValidatorFactory();
        validator = vf.getValidator();
        vf.close();
    }



    public static <T> void validate(T t, Class<?>... groups) throws ConstraintViolationException {
        Set<ConstraintViolation<T>> set =  validator.validate(t, groups);
        if(CollectionUtils.isNotEmpty(set)){
            throw new ConstraintViolationException(set);
        }
    }

}
