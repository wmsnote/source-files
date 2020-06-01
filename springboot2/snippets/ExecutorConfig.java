    //@Bean("fileProcessExecutor")
    public AsyncTaskExecutor fileProcessExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setAllowCoreThreadTimeOut(false);
        executor.setMaxPoolSize(10);
        executor.setKeepAliveSeconds(60);
        executor.setQueueCapacity(2000);
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setThreadNamePrefix("file-task-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.setAwaitTerminationSeconds(300);
        executor.setThreadFactory(new ThreadFactoryBuilder().setNameFormat("file-task-%d").build());
        executor.initialize();
        return executor;
    }
