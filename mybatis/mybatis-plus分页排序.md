## 配置分页插件

```java

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.pagination.optimize.JsqlParserCountOptimize;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author user
 * @date 2020/5/20 下午1:55
 */

@Configuration
public class MyBatisConfig {

    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        // 设置请求的页面大于最大页后操作， true调回到首页，false 继续请求  默认false
        // paginationInterceptor.setOverflow(false);
        // 设置最大单页限制数量，默认 500 条，-1 不受限制
        // paginationInterceptor.setLimit(500);
        // 开启 count 的 join 优化,只针对部分 left join
        paginationInterceptor.setCountSqlParser(new JsqlParserCountOptimize(true));
        return paginationInterceptor;
    }
}

```


## 分页排序

```java


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.boe.retail.crmses.common.mapper.ItemMapper;
import com.boe.retail.crmses.common.po.ItemPO;
import com.boe.retail.ses.vo.ItemVO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

/**
 * @author user
 * @date 2020/5/20 上午11:24
 */

@Service
public class ItemService {

    private final ItemMapper itemMapper;

    public ItemService(ItemMapper itemMapper){
        this.itemMapper = itemMapper;
    }

    public Page<ItemPO> listItems(ItemVO itemVO) {
        //分页
        Page<ItemPO> page = new Page<>(itemVO.getPageNo(), itemVO.getPageSize());

        //查询条件
        LambdaQueryWrapper<ItemPO> wrapper = Wrappers.lambdaQuery();
        String name = itemVO.getName();
        if (StringUtils.isNotBlank(name)) {
            wrapper.like(ItemPO::getName, itemVO.getName());
        }
        String itemCode = itemVO.getItemCode();
        if (StringUtils.isNotBlank(itemCode)){
            wrapper.eq(ItemPO::getItemCode, itemCode);
        }
        String orgId = itemVO.getOrgId();
        if (StringUtils.isNotBlank(orgId)){
            wrapper.eq(ItemPO::getOrgId, orgId);
        }
        //排序
        wrapper.orderByDesc(ItemPO::getId);

        page = itemMapper.selectPage(page, wrapper);
        return page;
    }
}

```



























