package com.project.omega.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/authenticate",
                        "/api/confirmRegistration").permitAll()
                .antMatchers("/api/registration").hasAnyRole("SUPER_ADMIN", "ADMIN")
                .antMatchers("/api/user/**").hasAnyRole("SUPER_ADMIN", "ADMIN", "DEFAULT_USER_ROLE")
                .antMatchers("/api/product/**").hasAnyRole("SUPER_ADMIN", "ADMIN", "DEFAULT_USER_ROLE")
                .antMatchers("/api/product/get",
                        "/api/product/{id}",
                        "/api/product/lt/**",
                        "/api/product/gt/**",
                        "/api/product/eq/**",
                        "/api/product/search/**",
                        "/api/product/supplier/**").hasAnyRole("SUPER_ADMIN", "ADMIN", "REP", "DEFAULT_USER_ROLE")
                .antMatchers("/api/supplier/**").hasAnyRole("SUPER_ADMIN", "ADMIN", "DEFAULT_USER_ROLE")
                .antMatchers("/api/supplier/get",
                        "/api/supplier/{id}",
                        "/api/supplier/{companyName}").hasAnyRole("SUPER_ADMIN", "ADMIN", "REP", "DEFAULT_USER_ROLE")
                .antMatchers("/api/order/**").hasAnyRole("SUPER_ADMIN", "ADMIN", "REP", "DEFAULT_USER_ROLE")
                .antMatchers("/api/client/**").hasAnyRole("SUPER_ADMIN", "ADMIN", "DEFAULT_USER_ROLE")
                .antMatchers("/api/client/get",
                        "/api/client/{id}",
                        "/api/client/{update}").hasAnyRole("SUPER_ADMIN", "ADMIN", "REP", "DEFAULT_USER_ROLE")
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}