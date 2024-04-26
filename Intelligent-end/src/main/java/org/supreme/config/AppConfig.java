package org.supreme.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.supreme.filter.BackstageFilter;

@Configuration
public class AppConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 配置后台拦截器
        registry.addInterceptor(backstageFilter()).addPathPatterns("/bk/**");
    }

    @Bean
    public BackstageFilter backstageFilter() {
        return new BackstageFilter();
    }
}


