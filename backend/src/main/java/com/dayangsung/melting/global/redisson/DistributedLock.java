package com.dayangsung.melting.global.redisson;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.concurrent.TimeUnit;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DistributedLock {

	String value(); // Lock의 이름

	TimeUnit timeUnit() default TimeUnit.MILLISECONDS;

	long waitTime() default 5L; // Lock 획득을 시도하는 최대 시간

	long leaseTime() default 2L; // Lock을 획득한 후, 점유하는 최대 시간
}
