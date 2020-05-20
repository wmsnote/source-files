package com.boe.retail.crmses.common.common;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * @author user
 * @date 2020/5/20 上午9:51
 */
public class IntListValidator implements ConstraintValidator<IntList,Integer> {

    private final Set<Integer> set = new HashSet<>();

    @Override
    public void initialize(IntList constraintAnnotation) {

        int[] ints = constraintAnnotation.value();
        Arrays.stream(ints).boxed().forEach(set::add);

    }


    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {

        return set.contains(value);
    }
}
