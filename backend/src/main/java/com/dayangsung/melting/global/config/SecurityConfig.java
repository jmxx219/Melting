package com.dayangsung.melting.global.config;

import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.dayangsung.melting.domain.auth.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.dayangsung.melting.domain.auth.service.AuthService;
import com.dayangsung.melting.global.filter.JwtFilter;
import com.dayangsung.melting.global.handler.LoginFailureHandler;
import com.dayangsung.melting.global.handler.LoginSuccessHandler;
import com.dayangsung.melting.global.util.CookieUtil;
import com.dayangsung.melting.global.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final AuthService authService;
	private final LoginSuccessHandler loginSuccessHandler;
	private final LoginFailureHandler loginFailureHandler;
	private final JwtUtil jwtUtil;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http,
		HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository) throws Exception {

		http
			.cors(cors -> cors.configurationSource(corsConfigurationSource()))
			.csrf(AbstractHttpConfigurer::disable)
			.formLogin(AbstractHttpConfigurer::disable)
			.httpBasic(AbstractHttpConfigurer::disable)
			.addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
			.oauth2Login(oauth2 -> oauth2
				.authorizationEndpoint(authorization -> authorization
					.baseUri("/oauth2/authorization")
					.authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository)
				)
				.redirectionEndpoint(redirection -> redirection
					.baseUri("/oauth2/login/code/*"))
				.userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
					.userService(authService))
				.successHandler(loginSuccessHandler)
				.failureHandler(loginFailureHandler))
			.authorizeHttpRequests(authorize ->
				authorize
					.requestMatchers(
						"/swagger-ui/**",
						"/v3/api-docs/**",
						"/api/v1/members/nickname-check",
						"/api/v1/members/init",
						"/login"
					)
					.permitAll()
					.anyRequest()
					.authenticated())
			.sessionManagement(session -> session
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}

	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
		configuration.setAllowedMethods(Collections.singletonList("*"));
		configuration.setAllowCredentials(true);
		configuration.setAllowedHeaders(List.of("Authorization", "Set-Cookie", "Content-Type"));
		configuration.setMaxAge(3600L);

		configuration.setExposedHeaders(List.of("Authorization", "Set-Cookie"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
