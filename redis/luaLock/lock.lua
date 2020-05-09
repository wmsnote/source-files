-- if redis.call('setNx',KEYS[1],ARGV[1]) then
--     if redis.call('get',KEYS[1])==ARGV[1] then
--         return redis.call('expire',KEYS[1],ARGV[2])
--     else
--         return 0
--     end
-- end



-- EX seconds PX milliseconds
-- NX SET NOT EXIST
-- only when set command execute success return OK
redis.call('set', KEYS[1], ARGV[1], 'EX', ARGV[2], 'NX')




