package com.boe.retail.data.syncapi.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.scripting.support.ResourceScriptSource;
import org.springframework.stereotype.Component;

import java.util.Collections;

/**
 * @author user
 */
@Component
@Slf4j
public class RedisKeyGenerator {

    public static final String KEYS_PREFIX = "sync-api";

    private final StringRedisTemplate stringRedisTemplate;

    private final DefaultRedisScript<String> lockScript;

    private final DefaultRedisScript<Long> unlockScript;


    public RedisKeyGenerator(StringRedisTemplate stringRedisTemplate){
        this.stringRedisTemplate = stringRedisTemplate;
        lockScript=  new DefaultRedisScript<>();
        lockScript.setScriptSource(new ResourceScriptSource(new ClassPathResource("lua/lock.lua")));
        lockScript.setResultType(String.class);

        unlockScript =  new DefaultRedisScript<>();
        unlockScript.setScriptSource(new ResourceScriptSource(new ClassPathResource("lua/unlock.lua")));
        unlockScript.setResultType(Long.class);
    }



    public String getKey(String key){
        return KEYS_PREFIX + ":" + key;
    }


    public String keyOfDataSync(String orgId, Long version) {
        return getKey("data" + ":" + orgId + ":" + version);
    }

    public String partenOfDataSync() {
        return getKey("data" + ":" + "*");
    }

    public boolean lock(String key, String requestId, long expireTime) {
        //获取锁的超时时间 10s
        long lockWaitTimeOut = 10 * 1000L;
        long deadTimeLine = System.currentTimeMillis() + lockWaitTimeOut;



        while(deadTimeLine >= System.currentTimeMillis()){
            String result = stringRedisTemplate.execute(lockScript, Collections.singletonList(getKey(key)), requestId, String.valueOf(expireTime));
            if(StringUtils.equals(result, "OK")){
                return true;
            }
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        return false;
    }

    public boolean unlock(String key, String requestId) {
        Long result = stringRedisTemplate.execute(unlockScript, Collections.singletonList(getKey(key)), requestId);
        return result != null && result == 1;
    }


}

