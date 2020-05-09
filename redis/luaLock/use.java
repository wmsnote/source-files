boolean lock = false;
String key = "lock-key:consume-item-line:" + orgId + ":" + itemCode;
String requestId = UUID.randomUUID().toString() + Thread.currentThread().getId();
try{
    lock = redisKeyGenerator.lock(key, requestId, 10);
    if (lock){
        //TODO
    }else {
        log.error("lock err")
    }
}finally {
    if(lock){
       boolean unlock = redisKeyGenerator.unlock(key, requestId);
       if(!unlock){
           log.error("unlock err");
       }
    }
}