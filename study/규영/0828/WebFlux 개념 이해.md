- 2. **WebFlux 개념 이해**
    - ***WebFlux란?***
        
        **WebFlux**는 스프링 프레임워크에서 제공하는 비동기, 논블로킹 방식의 웹 프레임워크로, **리액티브 프로그래밍**을 지원합니다. 주로 **높은 동시성 처리**가 필요한 애플리케이션에서 사용되며, 기존의 동기적이고 블로킹 방식의 웹 프레임워크인 **Spring MVC**와는 대조적으로 비동기적 데이터 흐름을 기반으로 동작합니다.
        
        ### 1. **WebFlux의 특징**
        
        - **비동기 및 논블로킹**: WebFlux는 논블로킹 I/O를 기반으로 하며, 이를 통해 스레드가 작업을 기다리지 않고 바로 다른 작업을 처리할 수 있어 동시성 처리가 효율적으로 이루어집니다.
        - **리액티브 스트림**: WebFlux는 리액티브 스트림 사양(예: `Publisher`, `Subscriber`, `Subscription`, `Processor`)을 따르고 있으며, **리액터(Reactor)**를 기본으로 사용합니다.
        - **높은 확장성**: 적은 리소스로도 많은 요청을 처리할 수 있으며, 특히 I/O 바운드 작업이 많은 환경에서 효율적입니다.
        - **서버와 클라이언트 모두 지원**: WebFlux는 웹 애플리케이션 서버 역할뿐 아니라 클라이언트로도 사용할 수 있습니다.
        
        ### 2. **WebFlux와 Spring MVC의 차이점**
        
        | **특징** | **Spring WebFlux** | **Spring MVC** |
        | --- | --- | --- |
        | **동기/비동기 처리** | 비동기/논블로킹 | 동기/블로킹 |
        | **스레드 관리 방식** | 적은 스레드로 많은 요청을 처리 | 요청마다 새로운 스레드를 할당 |
        | **기반 기술** | 리액티브 스트림 (Reactor, RxJava) | 서블릿 기반 (블로킹 I/O) |
        | **주요 사용 사례** | 높은 동시성과 비동기 작업에 적합 | 전통적인 동기 방식의 웹 애플리케이션 |
        | **지원하는 리턴 타입** | `Mono`, `Flux` (리액티브 타입) | `String`, `ModelAndView` 등 |
        
        ### 3. **WebFlux의 주요 구성 요소**
        
        - **리액티브 타입(Mono, Flux)**: WebFlux의 컨트롤러는 리액티브 스트림에서 설명한 `Mono`와 `Flux` 타입을 리턴할 수 있습니다. `Mono`는 하나의 데이터를 처리할 때, `Flux`는 여러 개의 데이터를 처리할 때 사용됩니다.
            
            ```java
            @GetMapping("/mono")
            public Mono<String> getMono() {
                return Mono.just("Hello, Mono");
            }
            
            @GetMapping("/flux")
            public Flux<String> getFlux() {
                return Flux.just("Hello", "World", "from", "Flux");
            }
            ```
            
        - **비동기 논블로킹 서버**: WebFlux는 **Netty**와 같은 비동기 I/O를 지원하는 서버를 기반으로 동작할 수 있습니다. 또한, 서블릿 3.1+ 사양을 따르는 서버(Tomcat, Jetty 등)에서도 비동기 처리가 가능합니다.
        - **HandlerFunction 및 RouterFunction**: WebFlux는 전통적인 @Controller 기반의 모델 외에도 함수형 스타일로 요청을 처리할 수 있는 **함수형 라우팅 API**를 제공합니다.
            
            ```java
            RouterFunction<ServerResponse> route = RouterFunctions.route(
                RequestPredicates.GET("/hello"),
                request -> ServerResponse.ok().body(BodyInserters.fromValue("Hello, World!"))
            );
            ```
            
        
        ### 4. **WebFlux의 주요 장점**
        
        - **높은 동시성 처리**: 블로킹 방식의 스레드 모델을 벗어나 더 적은 스레드로 많은 요청을 처리할 수 있어 고성능 애플리케이션에 적합합니다.
        - **리소스 효율성**: 블로킹 방식에서는 요청이 대기 중일 때 스레드가 잠들지만, WebFlux에서는 스레드가 대기하지 않고 다른 작업을 계속 처리할 수 있습니다.
        - **확장성**: 많은 동시 요청을 처리할 수 있는 능력 덕분에, 특히 대규모 실시간 애플리케이션에서 성능이 크게 향상됩니다.
        
        ### 5. **WebFlux의 사용 사례**
        
        - **실시간 애플리케이션**: 채팅 애플리케이션, 실시간 데이터 스트림 처리 등.
        - **API Gateway**: 비동기적으로 여러 마이크로서비스에 요청을 전달하고 그 결과를 집계하는 역할.
        - **마이크로서비스 간 통신**: 마이크로서비스 아키텍처에서 각 서비스 간의 비동기 통신에 적합.
        
        ### 결론
        
        WebFlux는 비동기적이고 논블로킹 방식으로 동작하는 리액티브 웹 프레임워크로, 고성능, 높은 확장성, 비동기 처리가 필요한 애플리케이션에 적합합니다. 리액터(Reactor)와 같은 리액티브 라이브러리를 기반으로 하여 데이터 스트림을 효율적으로 처리하며, 리액티브 프로그래밍의 강점을 웹 애플리케이션에서도 발휘할 수 있도록 해줍니다.
        
    - ***WebFlux의 아키텍처***
        - Netty, Undertow와 같은 논블로킹 서버와의 연동 방식
            
            Spring WebFlux는 비동기 및 논블로킹 웹 애플리케이션을 구축하기 위해 설계되었으며, 이를 위해 Netty, Undertow와 같은 논블로킹 서버와의 연동을 지원합니다. 이러한 서버들은 Spring WebFlux의 리액티브 프로그래밍 모델에 맞추어, 고성능의 비동기 웹 애플리케이션을 개발할 수 있게 해줍니다.
            
            ### 1. **Netty**
            
            **Netty**는 고성능 비동기 이벤트 드리븐 네트워크 프레임워크로, 주로 서버 측 네트워크 애플리케이션 개발에 사용됩니다. Spring WebFlux는 Netty를 기본 내장 서버로 사용할 수 있습니다.
            
            ### **연동 방식**
            
            - **내장형 서버로 Netty 사용**:
                - Spring Boot의 WebFlux 스타터를 사용하면, 기본적으로 Netty가 내장 서버로 설정됩니다. 별도로 설정하지 않아도 WebFlux 애플리케이션이 Netty 위에서 실행됩니다.
                - Spring Boot 애플리케이션이 시작될 때, Netty 서버가 자동으로 시작되며, 비동기 요청을 처리합니다.
                
                ```java
                @SpringBootApplication
                public class WebFluxApplication {
                    public static void main(String[] args) {
                        SpringApplication.run(WebFluxApplication.class, args);
                    }
                }
                ```
                
                위와 같은 기본적인 Spring Boot 애플리케이션에서, WebFlux 스타터를 사용하면 Netty가 기본 서버로 동작합니다.
                
            - **Netty 커스터마이징**:
                - 필요에 따라 Netty 서버의 동작을 커스터마이징할 수 있습니다. 예를 들어, 포트를 변경하거나 특정 핸들러를 추가하는 등의 작업이 가능합니다.
                
                ```java
                @Bean
                public NettyReactiveWebServerFactory nettyReactiveWebServerFactory() {
                    NettyReactiveWebServerFactory factory = new NettyReactiveWebServerFactory();
                    factory.addServerCustomizers(httpServer -> httpServer.port(8081)); // 포트 변경
                    return factory;
                }
                ```
                
            - **고성능, 비동기 처리**:
                - Netty는 비동기 I/O 모델을 사용하여, 많은 수의 클라이언트 연결을 처리할 수 있습니다. WebFlux의 논블로킹 특성과 결합하여 높은 동시성 처리가 가능해집니다.
            
            ### 2. **Undertow**
            
            **Undertow**는 경량의 고성능 웹 서버로, 비동기 및 논블로킹 I/O를 지원합니다. 특히 Undertow는 Java NIO를 활용하여 비동기 작업을 효율적으로 처리할 수 있습니다.
            
            ### **연동 방식**
            
            - **Undertow 설정**:
                - Spring Boot에서 WebFlux와 함께 Undertow를 사용하려면, `spring-boot-starter-undertow` 의존성을 추가해야 합니다. 이 경우, Netty 대신 Undertow가 내장 서버로 동작하게 됩니다.
                
                ```xml
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-webflux</artifactId>
                    <exclusions>
                        <exclusion>
                            <groupId>io.projectreactor.netty</groupId>
                            <artifactId>reactor-netty</artifactId>
                        </exclusion>
                    </exclusions>
                </dependency>
                
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-undertow</artifactId>
                </dependency>
                ```
                
            - **Undertow 커스터마이징**:
                - Undertow도 Netty와 마찬가지로 서버의 동작을 커스터마이징할 수 있습니다. 예를 들어, 비동기 스레드 풀의 크기 조정, HTTP/2 지원 등을 설정할 수 있습니다.
                
                ```java
                @Bean
                public UndertowReactiveWebServerFactory undertowReactiveWebServerFactory() {
                    UndertowReactiveWebServerFactory factory = new UndertowReactiveWebServerFactory();
                    factory.addBuilderCustomizers(builder ->
                        builder.setIoThreads(4)  // I/O 스레드 개수 설정
                               .setWorkerThreads(20)  // 작업 스레드 개수 설정
                    );
                    return factory;
                }
                ```
                
            
            ### 3. **Netty와 Undertow의 비교**
            
            - **Netty**:
                - 더 강력한 커뮤니티와 생태계를 보유하고 있어, 다양한 네트워크 프로토콜을 지원합니다.
                - 복잡한 비동기 네트워크 애플리케이션을 구축하는 데 적합합니다.
                - Spring WebFlux의 기본 내장 서버로, 다양한 커스터마이징 옵션을 제공합니다.
            - **Undertow**:
                - 더 가벼운 서버로, 성능 최적화가 잘 되어 있습니다.
                - Undertow는 단일 스레드 기반의 커넥터를 사용해 매우 낮은 메모리 오버헤드를 자랑합니다.
                - 빠른 시작 시간과 적은 메모리 사용량이 필요할 때 유용합니다.
            
            ### 4. **서버 선택 고려사항**
            
            - **성능 요구사항**: 높은 동시성 처리가 필요하다면 Netty가 유리하며, 저렴한 메모리 사용과 빠른 응답이 필요하다면 Undertow가 적합할 수 있습니다.
            - **애플리케이션 구조**: 네트워크 프로토콜이나 커스터마이징 요구사항에 따라 Netty나 Undertow 중 선택할 수 있습니다.
            - **기본 설정**: 특별한 요구사항이 없다면, Spring Boot의 기본 설정인 Netty를 사용하는 것이 일반적입니다.
            
            ### 결론
            
            WebFlux는 비동기적이고 논블로킹 방식으로 동작하는 웹 애플리케이션을 개발하기 위해 Netty, Undertow와 같은 비동기 I/O 서버와 잘 연동됩니다. 각 서버는 고유의 장점을 가지고 있으며, 애플리케이션의 요구사항에 따라 선택하고 커스터마이징할 수 있습니다. 이를 통해 높은 동시성 처리, 빠른 응답 시간, 효율적인 리소스 사용을 보장할 수 있습니다.
            
        - WebFlux의 두 가지 프로그래밍 모델
            - **애노테이션 기반(Annotation-based)**: Spring MVC와 유사한 방식의 개발
                
                ### 1. **애노테이션 기반(Annotation-based) 프로그래밍 모델**
                
                애노테이션 기반 모델은 **Spring MVC**와 유사한 방식으로 웹 애플리케이션을 개발할 수 있는 모델입니다. 익숙한 방식으로 컨트롤러, 서비스 등을 정의하며, `@Controller`, `@RequestMapping` 같은 애노테이션을 사용합니다. 주로 기존 Spring MVC 개발 방식에 익숙한 개발자들이 쉽게 적응할 수 있습니다.
                
                ### **특징**
                
                - **전통적인 Spring 스타일**: 기존의 Spring MVC 방식과 매우 유사하므로, 이전에 Spring MVC를 사용했던 개발자들이 쉽게 전환할 수 있습니다.
                - **명시적인 라우팅 정의**: URL 경로와 HTTP 메서드 등을 애노테이션을 통해 명시적으로 정의합니다.
                - **비동기 및 논블로킹 지원**: 애노테이션 기반 모델이지만, WebFlux의 특성인 비동기 및 논블로킹 프로그래밍을 사용할 수 있습니다.
                
                ### **예시**
                
                ```java
                @RestController
                public class HelloController {
                
                    @GetMapping("/hello")
                    public Mono<String> hello() {
                        return Mono.just("Hello, WebFlux!");
                    }
                
                    @GetMapping("/flux")
                    public Flux<String> flux() {
                        return Flux.just("Hello", "from", "Flux!");
                    }
                }
                ```
                
                - **`@RestController`**: Spring MVC와 동일하게 컨트롤러를 정의하는 애노테이션입니다. JSON 응답을 자동으로 처리해줍니다.
                - **`@GetMapping`**: HTTP GET 요청에 대한 매핑을 설정합니다.
                - **리액티브 타입**: 반환 타입으로 `Mono`와 `Flux`를 사용하여 비동기 스트림을 처리합니다.
                
                ### **장점**
                
                - **간편한 사용성**: 익숙한 MVC 스타일로 쉽게 사용할 수 있으며, Spring 애플리케이션에서 널리 사용되는 구조입니다.
                - **풍부한 기능 제공**: Spring MVC에서 제공하는 대부분의 기능을 사용할 수 있습니다.
                
                ### **단점**
                
                - 애노테이션을 다수 사용해야 하며, 코드가 많아질 수 있습니다.
                - 라우팅이 분산되어 있어 함수형 방식에 비해 코드 가독성이 떨어질 수 있습니다.
            - **함수형(Functional)**: 더 자유롭고 가벼운 핸들러 정의 방식
                
                ### 2. **함수형(Functional) 프로그래밍 모델**
                
                함수형 프로그래밍 모델은 **경량화된 라우팅**과 **핸들러 정의**를 통해 애플리케이션을 보다 명확하고 간결하게 구성할 수 있는 방식입니다. 애노테이션을 사용하지 않고, 순수 자바 코드로 요청을 처리하는 라우터와 핸들러를 정의합니다. 이 모델은 자유롭고 유연한 라우팅 구성을 가능하게 하며, **함수형 프로그래밍 패러다임**에 적합합니다.
                
                ### **특징**
                
                - **명시적이고 일관된 라우팅 정의**: 모든 라우팅을 하나의 함수로 정의할 수 있어 구조가 명확합니다.
                - **애노테이션 사용 없음**: Spring의 애노테이션 없이 순수 자바 코드로만 라우팅과 핸들러를 정의합니다.
                - **유연한 설계**: 핸들러와 라우팅이 분리되어 있어 더 유연한 웹 애플리케이션 설계가 가능합니다.
                
                ### **예시**
                
                ```java
                @Configuration
                public class RouterConfig {
                
                    @Bean
                    public RouterFunction<ServerResponse> route(HelloHandler handler) {
                        return RouterFunctions.route(RequestPredicates.GET("/hello"), handler::hello)
                                              .andRoute(RequestPredicates.GET("/flux"), handler::flux);
                    }
                }
                
                @Component
                public class HelloHandler {
                
                    public Mono<ServerResponse> hello(ServerRequest request) {
                        return ServerResponse.ok().body(Mono.just("Hello, WebFlux!"), String.class);
                    }
                
                    public Mono<ServerResponse> flux(ServerRequest request) {
                        return ServerResponse.ok().body(Flux.just("Hello", "from", "Flux!"), String.class);
                    }
                }
                ```
                
                - **`RouterFunction`**: 요청을 라우팅하는 함수로, 요청 경로와 HTTP 메서드를 기반으로 핸들러를 연결합니다.
                - **`RequestPredicates`**: 요청의 조건(GET, POST 등)을 정의합니다.
                - **핸들러 클래스**: 비즈니스 로직을 담당하는 핸들러는 요청을 받아 처리하고, `ServerResponse` 객체를 반환합니다.
                
                ### **장점**
                
                - **가볍고 유연한 라우팅**: 모든 라우팅을 하나의 함수로 정의하므로 코드가 명확해집니다.
                - **함수형 프로그래밍**: 핸들러가 순수 함수처럼 동작하며, 상태가 없고 변경 가능성을 최소화합니다.
                - **테스트 용이성**: 핸들러와 라우터가 분리되어 있어 단위 테스트가 더 용이합니다.
                
                ### **단점**
                
                - **기존 MVC와 다른 구조**: Spring MVC에 익숙한 개발자에게는 초기 학습 비용이 발생할 수 있습니다.
                - **복잡한 애플리케이션에서는 복잡성 증가**: 라우팅과 핸들러를 함수형 방식으로 모두 정의하려면 코드가 복잡해질 수 있습니다.
            - 두 가지 모델의 비교 및 결론
                
                ### 3. **두 가지 모델의 비교**
                
                | **특징** | **애노테이션 기반(Annotation-based)** | **함수형(Functional)** |
                | --- | --- | --- |
                | **구조** | MVC와 유사, 애노테이션 사용 | 함수형, 명시적 라우팅 |
                | **코드 가독성** | 익숙한 방식, 코드가 비교적 길어짐 | 간결하고 명시적 |
                | **유연성** | 제한적 (애노테이션 중심) | 자유롭고 유연한 구조 |
                | **테스트 용이성** | 다소 복잡할 수 있음 | 함수형으로 분리되어 더 용이 |
                | **애노테이션 사용 여부** | 사용 | 사용하지 않음 |
                | **초기 학습 비용** | 낮음 | 함수형 방식에 익숙해져야 함 |
                
                ### 결론
                
                - **애노테이션 기반** 모델은 기존 Spring MVC의 스타일을 유지하면서 WebFlux의 비동기 기능을 활용하고자 할 때 유용합니다. 직관적이고 익숙한 패턴이므로, MVC 구조에 익숙한 개발자에게 적합합니다.
                - **함수형 프로그래밍 모델**은 더 가볍고 자유롭게 라우팅과 핸들러를 정의하고자 할 때 적합합니다. 비즈니스 로직이 간단하거나, 함수형 프로그래밍 패러다임을 선호하는 경우 더 효과적입니다.
                
                두 모델은 상황과 요구사항에 따라 선택할 수 있으며, Spring WebFlux에서는 둘 다 완벽하게 지원되므로, 애플리케이션의 특성에 맞는 방식으로 활용할 수 있습니다.