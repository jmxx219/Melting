package com.dayangsung.melting.global.batch;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class BatchScheduler {
	private final JobLauncher jobLauncher;
	private final Job resetDailyStreamingJob;
	private final Job resetMonthlyStreamingJob;

	@Scheduled(cron = "0 0 0 * * ?", zone = "Asia/Seoul")
	public void runDailyJob() throws Exception {
		JobParameters jobParameters = new JobParametersBuilder()
			.addLong("time", System.currentTimeMillis())
			.toJobParameters();
		jobLauncher.run(resetDailyStreamingJob, jobParameters);
	}

	@Scheduled(cron = "0 0 0 1 * ?", zone = "Asia/Seoul")
	public void runMonthlyJob() throws Exception {
		JobParameters jobParameters = new JobParametersBuilder()
			.addLong("time", System.currentTimeMillis())
			.toJobParameters();
		jobLauncher.run(resetMonthlyStreamingJob, jobParameters);
	}
}
