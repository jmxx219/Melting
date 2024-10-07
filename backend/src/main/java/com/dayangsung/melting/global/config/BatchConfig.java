package com.dayangsung.melting.global.config;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import com.dayangsung.melting.global.common.service.RedisService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class BatchConfig {

	private final JobRepository jobRepository;
	private final PlatformTransactionManager transactionManager;
	private final RedisService redisService;

	@Bean
	public Job resetDailyStreamingJob() {
		return new JobBuilder("resetDailyStreamingJob", jobRepository)
			.incrementer(new RunIdIncrementer())
			.start(resetDailyStreamingStep())
			.build();
	}

	@Bean
	@JobScope
	public Step resetDailyStreamingStep() {
		return new StepBuilder("resetDailyStreamingStep", jobRepository)
			.tasklet(resetDailyStreamingTasklet(), transactionManager)
			.build();
	}

	@Bean
	@StepScope
	public Tasklet resetDailyStreamingTasklet() {
		return (contribution, chunkContext) -> {
			redisService.resetDailyStreamingCount();
			return RepeatStatus.FINISHED;
		};
	}

	@Bean
	public Job resetMonthlyStreamingJob() {
		return new JobBuilder("resetMonthlyStreamingJob", jobRepository)
			.incrementer(new RunIdIncrementer())
			.start(resetMonthlyStreamingStep())
			.build();
	}

	@Bean
	@JobScope
	public Step resetMonthlyStreamingStep() {
		return new StepBuilder("resetMonthlyStreamingStep", jobRepository)
			.tasklet(resetMonthlyStreamingTasklet(), transactionManager)
			.build();
	}

	@Bean
	@StepScope
	public Tasklet resetMonthlyStreamingTasklet() {
		return (contribution, chunkContext) -> {
			redisService.resetMonthlyStreamingCount();
			return RepeatStatus.FINISHED;
		};
	}
}
