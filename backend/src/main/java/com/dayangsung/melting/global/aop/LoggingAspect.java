package com.dayangsung.melting.global.aop;

import java.util.Arrays;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import com.dayangsung.melting.global.exception.MeltingException;
import com.dayangsung.melting.global.util.WebHookUtils;

import lombok.extern.slf4j.Slf4j;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

	private static final String WEBHOOK_MESSAGE = "Error occurs : Webhooks sent";

	@Pointcut("within(@com.dayangsung.melting.global.aop.LogExecution *)")
	public void beanAnnotatedWithLogExecution() {
	}

	@Around("beanAnnotatedWithLogExecution()")
	public Object logExceptionsAndInputs(ProceedingJoinPoint joinPoint) throws Throwable {
		Object[] args = joinPoint.getArgs();
		String methodName = joinPoint.getSignature().getName();
		String className = joinPoint.getSignature().getDeclaringTypeName();
		try {
			Object result = joinPoint.proceed();
			log.info("{}.{}() with arguments:{} Successfully executed", className, methodName, Arrays.toString(args));
			return result;
		} catch (MeltingException ex) {
			sendWebHook(getErrorLogMessage(className, methodName, args, ex.getMessage()));
			throw ex;
		} catch (Exception ex) {
			sendWebHook(getErrorLogMessage(className, methodName, args, ex.getMessage()));
			throw ex;
		}
	}

	private String getErrorLogMessage(String className, String methodName, Object[] args, String errorMessage) {
		return String.format("```\nException in %s. %s() called with arguments:%s with message:%s\n```",
			className, methodName, Arrays.toString(args), errorMessage);
	}

	private void sendWebHook(String logMessage) {
		log.error(logMessage);
		WebHookUtils.sendWebHookMessage(logMessage);
		log.info(WEBHOOK_MESSAGE);
	}
}
