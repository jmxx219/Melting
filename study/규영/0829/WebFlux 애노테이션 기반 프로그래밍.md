- 3. **WebFlux 애노테이션 기반 프로그래밍**
    
    애노테이션 기반 개발 방식은 Spring MVC와 유사하므로 기존 Spring MVC 경험이 있는 개발자라면 빠르게 익힐 수 있습니다.
    
    - ***Controller 생성***
        
        Spring WebFlux에서 애노테이션 기반 프로그래밍을 사용하면, `@RestController`, `@GetMapping`, `@PostMapping` 등의 애노테이션을 활용하여 RESTful 웹 서비스를 쉽게 개발할 수 있습니다. 이 방식은 전통적인 Spring MVC와 매우 유사하며, 비동기적 데이터 처리와 리액티브 프로그래밍을 사용할 수 있습니다.
        
        ### 1. **애노테이션 기반 Controller 생성**
        
        ### **예시 코드**
        
        ```java
        @RestController
        @RequestMapping("/api")
        public class UserController {
        
            // GET 요청을 처리하는 메서드
            @GetMapping("/users")
            public Flux<String> getAllUsers() {
                return Flux.just("User1", "User2", "User3");
            }
        
            // 단일 GET 요청 처리 (경로 변수 사용)
            @GetMapping("/users/{id}")
            public Mono<String> getUserById(@PathVariable String id) {
                return Mono.just("User: " + id);
            }
        
            // POST 요청을 처리하는 메서드
            @PostMapping("/users")
            public Mono<String> createUser(@RequestBody String username) {
                return Mono.just("Created user: " + username);
            }
        }
        ```
        
        ### 2. **애노테이션 설명**
        
        - **`@RestController`**:
            - `@Controller`와 `@ResponseBody`를 결합한 애노테이션입니다.
            - 이 애노테이션을 사용하면, 클래스 내의 모든 메서드는 기본적으로 HTTP 응답 본문에 직렬화된 형태로 반환됩니다.
            - 주로 RESTful 웹 서비스를 만들 때 사용되며, 클라이언트에게 JSON이나 XML 형태로 데이터를 반환합니다.
        - **`@RequestMapping`**:
            - 클래스 레벨에서 공통 경로를 설정할 수 있는 애노테이션입니다.
            - 이 애노테이션을 사용하여 해당 클래스 내의 모든 요청에 대해 `/api` 경로를 기반으로 라우팅합니다.
        - **`@GetMapping`**:
            - HTTP GET 요청을 처리하는 메서드에 사용됩니다.
            - 경로(`/users` 또는 `/users/{id}`)를 매핑하고, 경로 변수 또는 쿼리 파라미터를 받아 비동기적으로 데이터를 처리할 수 있습니다.
        - **`@PostMapping`**:
            - HTTP POST 요청을 처리하는 메서드에 사용됩니다.
            - 요청 본문 데이터를 `@RequestBody`로 받을 수 있으며, 주로 데이터를 생성하거나 업데이트할 때 사용됩니다.
        - **`@PathVariable`**:
            - 경로 변수로 들어오는 값을 메서드 파라미터로 매핑할 때 사용합니다. 예를 들어 `/users/{id}`에서 `{id}`는 동적으로 변경될 수 있는 값입니다.
        - **`@RequestBody`**:
            - HTTP 요청 본문에 있는 데이터를 자바 객체로 변환해주는 역할을 합니다.
            - 주로 POST, PUT 요청에서 본문 데이터를 처리할 때 사용됩니다.
        
        ### 3. **리액티브 타입**
        
        - **Mono**:
            - `Mono<T>`는 단일 값 또는 0개의 값을 비동기적으로 반환할 때 사용됩니다.
            - 예를 들어, 단일 사용자 정보를 반환하거나, 요청 결과가 단일 객체일 때 사용됩니다.
            
            ```java
            @GetMapping("/user/{id}")
            public Mono<User> getUserById(@PathVariable String id) {
                return userService.findById(id);
            }
            ```
            
        - **Flux**:
            - `Flux<T>`는 여러 개의 값을 비동기적으로 스트림 형태로 반환할 때 사용됩니다.
            - 주로 리스트 형태의 데이터를 반환하거나 스트리밍 데이터를 처리할 때 사용됩니다.
            
            ```java
            @GetMapping("/users")
            public Flux<User> getAllUsers() {
                return userService.findAll();
            }
            ```
            
        
        ### 4. **Controller의 동작 흐름**
        
        - 클라이언트가 `/api/users` 경로로 HTTP GET 요청을 보내면, `getAllUsers()` 메서드가 실행되고, `Flux<String>` 객체가 비동기적으로 데이터를 반환합니다.
        - 클라이언트가 `/api/users/{id}` 경로로 HTTP GET 요청을 보내면, `{id}`에 해당하는 사용자의 정보가 `getUserById()` 메서드를 통해 반환됩니다.
        - 클라이언트가 `/api/users` 경로로 HTTP POST 요청을 보내고, 본문에 새로운 사용자 정보를 포함하면, `createUser()` 메서드가 실행되어 사용자 생성 작업이 처리됩니다.
        
        ### 5. **추가적인 예시**
        
        ### **PUT 요청 처리**
        
        ```java
        @PutMapping("/users/{id}")
        public Mono<String> updateUser(@PathVariable String id, @RequestBody String username) {
            return Mono.just("Updated user " + id + " with name " + username);
        }
        ```
        
        ### **DELETE 요청 처리**
        
        ```java
        @DeleteMapping("/users/{id}")
        public Mono<Void> deleteUser(@PathVariable String id) {
            return Mono.empty(); // 사용자 삭제 후 빈 응답 반환
        }
        ```
        
        ### 결론
        
        애노테이션 기반 프로그래밍 모델을 사용하면 Spring WebFlux에서 비동기, 논블로킹 방식으로 REST API를 쉽게 개발할 수 있습니다. `@RestController`, `@GetMapping`, `@PostMapping` 등의 애노테이션을 활용해 경로와 HTTP 메서드에 따른 핸들러 메서드를 정의할 수 있으며, 리액티브 타입인 `Mono`와 `Flux`를 사용해 비동기적으로 데이터를 처리하고 반환할 수 있습니다. 이 방식은 기존의 Spring MVC와 유사하므로 익숙하게 사용할 수 있지만, WebFlux의 비동기 특성을 그대로 활용할 수 있는 장점이 있습니다.
        
    - ***비동기 핸들링***
        
        Spring WebFlux에서 비동기 방식의 핸들러 메서드를 구현할 때, 리액티브 스트림의 두 가지 기본 요소인 `Mono<T>`와 `Flux<T>`를 활용합니다. 각각의 핸들러 메서드는 비동기적으로 데이터를 반환하며, `Mono<T>`는 **단일 값**을 반환할 때, `Flux<T>`는 **여러 개의 값**을 반환할 때 사용됩니다.
        
        `*Mono<T>`와 `Flux<T>`를 반환하는 비동기 방식의 핸들러 구현*
        
        ### 1. **Mono<T>를 반환하는 비동기 핸들러**
        
        - `*Mono<T>` 를 반환하는 비동기 핸들러*
            
            `Mono<T>`는 **단일 값**을 비동기적으로 반환하는 리액티브 스트림입니다. 데이터가 하나이거나 없을 때 적합합니다.
            
            ### **예시: 단일 사용자 조회 (Mono)**
            
            ```java
            @RestController
            @RequestMapping("/api")
            public class UserController {
            
                private final UserService userService;
            
                // 생성자 주입
                public UserController(UserService userService) {
                    this.userService = userService;
                }
            
                // 단일 사용자 조회
                @GetMapping("/users/{id}")
                public Mono<User> getUserById(@PathVariable String id) {
                    return userService.findById(id);
                }
            }
            ```
            
            - **핸들러 메서드**: `getUserById()` 메서드는 `Mono<User>` 타입을 반환합니다. 이 메서드는 `UserService`에서 비동기적으로 사용자 정보를 조회한 후 반환합니다.
            - **리액티브 타입**: `Mono<T>`는 비동기적으로 단일 값(`User` 객체)을 클라이언트에 반환합니다. 만약 데이터가 없으면 빈 `Mono`가 반환될 수 있습니다.
        
        ### 2. **Flux<T>를 반환하는 비동기 핸들러**
        
        - `*Flux<T>` 를 반환하는 비동기 핸들러*
            
            `Flux<T>`는 **여러 개의 값**을 비동기적으로 스트림 형태로 반환하는 리액티브 스트림입니다. 데이터가 여러 개일 때 적합합니다.
            
            ### **예시: 모든 사용자 조회 (Flux)**
            
            ```java
            @RestController
            @RequestMapping("/api")
            public class UserController {
            
                private final UserService userService;
            
                // 생성자 주입
                public UserController(UserService userService) {
                    this.userService = userService;
                }
            
                // 모든 사용자 조회
                @GetMapping("/users")
                public Flux<User> getAllUsers() {
                    return userService.findAll();
                }
            }
            ```
            
            - **핸들러 메서드**: `getAllUsers()` 메서드는 `Flux<User>` 타입을 반환합니다. 이 메서드는 비동기적으로 여러 사용자의 데이터를 스트리밍 방식으로 반환합니다.
            - **리액티브 타입**: `Flux<T>`는 비동기적으로 다수의 값(`User` 객체 리스트)을 클라이언트에게 순차적으로 스트리밍합니다.
        
        ### 3. **Service 계층에서 비동기 처리**
        
        비동기 방식의 서비스 계층은 데이터베이스나 외부 API와 비동기적으로 통신하며, `Mono<T>`와 `Flux<T>`를 반환합니다.
        
        - 예시: UserService
            
            ```java
            @Service
            public class UserService {
            
                private final UserRepository userRepository;
            
                // 생성자 주입
                public UserService(UserRepository userRepository) {
                    this.userRepository = userRepository;
                }
            
                // 단일 사용자 조회 (Mono 반환)
                public Mono<User> findById(String id) {
                    return userRepository.findById(id);
                }
            
                // 모든 사용자 조회 (Flux 반환)
                public Flux<User> findAll() {
                    return userRepository.findAll();
                }
            }
            ```
            
            - **`findById()`**: `Mono<User>`를 반환하는 메서드로, 특정 ID의 사용자를 비동기적으로 조회합니다.
            - **`findAll()`**: `Flux<User>`를 반환하는 메서드로, 모든 사용자를 비동기적으로 조회합니다.
        
        ### 4. **Mono와 Flux의 실제 데이터 처리**
        
        - Mono 예시: 단일 사용자 조회
            
            ```java
            @GetMapping("/users/{id}")
            public Mono<ResponseEntity<User>> getUserById(@PathVariable String id) {
                return userService.findById(id)
                                  .map(user -> ResponseEntity.ok(user))
                                  .defaultIfEmpty(ResponseEntity.notFound().build());
            }
            ```
            
            - **`map()`**: `Mono`가 가진 데이터를 변환합니다. 여기서는 `User` 객체를 `ResponseEntity<User>`로 변환하고 있습니다.
            - **`defaultIfEmpty()`**: 값이 없을 때 기본적으로 빈 `ResponseEntity`를 반환합니다.
        - Flux 예시: 모든 사용자 조회
            
            ```java
            @GetMapping("/users")
            public Flux<User> getAllUsers() {
                return userService.findAll()
                                  .filter(user -> user.isActive()); // 필터링 적용
            }
            ```
            
            - **`filter()`**: `Flux`에 있는 데이터를 필터링합니다. 여기서는 활성화된 사용자만 반환하고 있습니다.
        
        ### 5. **에러 처리**
        
        비동기 처리 중 오류가 발생할 경우 `Mono`와 `Flux`는 에러 처리 메서드를 제공합니다.
        
        - Mono 예시: 에러 처리
            
            ```java
            @GetMapping("/users/{id}")
            public Mono<ResponseEntity<User>> getUserById(@PathVariable String id) {
                return userService.findById(id)
                                  .map(user -> ResponseEntity.ok(user))
                                  .switchIfEmpty(Mono.error(new RuntimeException("User not found")))
                                  .onErrorResume(e -> Mono.just(ResponseEntity.status(HttpStatus.NOT_FOUND).build()));
            }
            ```
            
            - **`switchIfEmpty()`**: 데이터가 없을 때 에러를 발생시킵니다.
            - **`onErrorResume()`**: 에러가 발생했을 때 대체 데이터를 반환하거나 에러를 처리합니다.
        - Flux 예시: 에러 처리
            
            ```java
            @GetMapping("/users")
            public Flux<User> getAllUsers() {
                return userService.findAll()
                                  .onErrorContinue((throwable, user) -> {
                                      // 에러 발생 시 처리 (계속해서 다음 사용자로 진행)
                                      System.out.println("Error processing user: " + user);
                                  });
            }
            ```
            
            - **`onErrorContinue()`**: 에러가 발생해도 스트림을 중단하지 않고 계속해서 다음 데이터를 처리합니다.
        
        ### 6. **결론**
        
        `Mono<T>`와 `Flux<T>`를 사용하면 비동기 방식으로 단일 값 또는 여러 값을 처리할 수 있으며, 리액티브 스트림을 통해 효율적으로 데이터를 클라이언트에게 반환할 수 있습니다. WebFlux의 비동기 핸들러 메서드를 구현할 때는 서비스 계층이 비동기적으로 데이터를 반환하도록 설계되며, 다양한 연산자(map, filter, onErrorResume 등)를 활용하여 데이터 변환, 필터링, 에러 처리 등을 비동기적으로 수행할 수 있습니다.
        
    - ***리액티브 데이터 처리***
    
    리액티브 데이터 처리는 비동기 및 논블로킹 방식으로 데이터를 처리하는 것을 목표로 합니다. Spring WebFlux와 함께 사용되는 대표적인 리액티브 데이터베이스 연동 방식으로는 **R2DBC**(Relational Database Connectivity)와 **MongoDB**가 있습니다. 이들은 각각 관계형 데이터베이스와 NoSQL 데이터베이스에 대한 리액티브 접근을 제공합니다. 이 두 방식의 연동 방식을 학습하는 방법을 설명하겠습니다.
    
    ### 1. **R2DBC (Relational Database Connectivity)**
    
    R2DBC는 비동기 및 논블로킹 방식으로 관계형 데이터베이스와 통신하는 리액티브 API입니다. 이는 기존의 JDBC와 달리, 리액티브 스트림을 사용해 데이터를 처리할 수 있습니다.
    
    ### **1.1. R2DBC 설정**
    
    먼저, Spring Boot 애플리케이션에 R2DBC를 설정하는 방법을 살펴보겠습니다.
    
    **의존성 추가**:
    
    ```xml
    <dependencies>
        <!-- Spring Data R2DBC -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-r2dbc</artifactId>
        </dependency>
    
        <!-- R2DBC 드라이버 (예: PostgreSQL) -->
        <dependency>
            <groupId>io.r2dbc</groupId>
            <artifactId>r2dbc-postgresql</artifactId>
        </dependency>
    
        <!-- 리액티브 JDBC를 위한 드라이버 (Spring Boot 3.x) -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
        </dependency>
    </dependencies>
    ```
    
    **애플리케이션 설정**:
    
    ```yaml
    spring:
      r2dbc:
        url: r2dbc:postgresql://localhost:5432/mydatabase
        username: myuser
        password: mypassword
    ```
    
    ### **1.2. 리액티브 리포지토리 사용**
    
    R2DBC에서 데이터베이스 접근을 위해 리액티브 리포지토리를 사용할 수 있습니다.
    
    **Entity 클래스**:
    
    ```java
    import org.springframework.data.annotation.Id;
    import org.springframework.data.relational.core.mapping.Table;
    
    @Table("users")
    public class User {
        @Id
        private Long id;
        private String name;
        private String email;
    
        // Getters and Setters
    }
    ```
    
    **리포지토리 인터페이스**:
    
    ```java
    import org.springframework.data.repository.reactive.ReactiveCrudRepository;
    import reactor.core.publisher.Mono;
    
    public interface UserRepository extends ReactiveCrudRepository<User, Long> {
        Mono<User> findByName(String name);
    }
    ```
    
    ### **1.3. 리액티브 서비스와 컨트롤러 구현**
    
    **서비스 계층**:
    
    ```java
    import org.springframework.stereotype.Service;
    import reactor.core.publisher.Flux;
    import reactor.core.publisher.Mono;
    
    @Service
    public class UserService {
        private final UserRepository userRepository;
    
        public UserService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }
    
        public Flux<User> getAllUsers() {
            return userRepository.findAll();
        }
    
        public Mono<User> getUserById(Long id) {
            return userRepository.findById(id);
        }
    
        public Mono<User> createUser(User user) {
            return userRepository.save(user);
        }
    
        public Mono<Void> deleteUser(Long id) {
            return userRepository.deleteById(id);
        }
    }
    ```
    
    **컨트롤러**:
    
    ```java
    import org.springframework.web.bind.annotation.*;
    import reactor.core.publisher.Flux;
    import reactor.core.publisher.Mono;
    
    @RestController
    @RequestMapping("/api/users")
    public class UserController {
        private final UserService userService;
    
        public UserController(UserService userService) {
            this.userService = userService;
        }
    
        @GetMapping
        public Flux<User> getAllUsers() {
            return userService.getAllUsers();
        }
    
        @GetMapping("/{id}")
        public Mono<User> getUserById(@PathVariable Long id) {
            return userService.getUserById(id);
        }
    
        @PostMapping
        public Mono<User> createUser(@RequestBody User user) {
            return userService.createUser(user);
        }
    
        @DeleteMapping("/{id}")
        public Mono<Void> deleteUser(@PathVariable Long id) {
            return userService.deleteUser(id);
        }
    }
    ```
    
    ### 2. **MongoDB와 리액티브 연동**
    
    MongoDB는 기본적으로 비동기적이며, Spring Data MongoDB는 리액티브 지원을 통해 더 쉽게 비동기 데이터베이스 접근을 제공합니다.
    
    ### **2.1. MongoDB 설정**
    
    Spring Boot 애플리케이션에서 리액티브 MongoDB를 설정하는 방법을 살펴보겠습니다.
    
    **의존성 추가**:
    
    ```xml
    <dependencies>
        <!-- Spring Data Reactive MongoDB -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-mongodb-reactive</artifactId>
        </dependency>
    </dependencies>
    ```
    
    **애플리케이션 설정**:
    
    ```yaml
    spring:
      data:
        mongodb:
          uri: mongodb://localhost:27017/mydatabase
    ```
    
    ### **2.2. 리액티브 리포지토리 사용**
    
    MongoDB에서도 R2DBC와 유사하게 리액티브 리포지토리를 사용할 수 있습니다.
    
    **Document 클래스**:
    
    ```java
    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;
    
    @Document(collection = "users")
    public class User {
        @Id
        private String id;
        private String name;
        private String email;
    
        // Getters and Setters
    }
    ```
    
    **리포지토리 인터페이스**:
    
    ```java
    import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
    import reactor.core.publisher.Mono;
    
    public interface UserRepository extends ReactiveMongoRepository<User, String> {
        Mono<User> findByName(String name);
    }
    ```
    
    ### **2.3. 리액티브 서비스와 컨트롤러 구현**
    
    MongoDB와의 연동에서 서비스 및 컨트롤러 계층은 R2DBC와 유사하게 구현할 수 있습니다.
    
    **서비스 계층**:
    
    ```java
    import org.springframework.stereotype.Service;
    import reactor.core.publisher.Flux;
    import reactor.core.publisher.Mono;
    
    @Service
    public class UserService {
        private final UserRepository userRepository;
    
        public UserService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }
    
        public Flux<User> getAllUsers() {
            return userRepository.findAll();
        }
    
        public Mono<User> getUserById(String id) {
            return userRepository.findById(id);
        }
    
        public Mono<User> createUser(User user) {
            return userRepository.save(user);
        }
    
        public Mono<Void> deleteUser(String id) {
            return userRepository.deleteById(id);
        }
    }
    ```
    
    **컨트롤러**:
    
    ```java
    import org.springframework.web.bind.annotation.*;
    import reactor.core.publisher.Flux;
    import reactor.core.publisher.Mono;
    
    @RestController
    @RequestMapping("/api/users")
    public class UserController {
        private final UserService userService;
    
        public UserController(UserService userService) {
            this.userService = userService;
        }
    
        @GetMapping
        public Flux<User> getAllUsers() {
            return userService.getAllUsers();
        }
    
        @GetMapping("/{id}")
        public Mono<User> getUserById(@PathVariable String id) {
            return userService.getUserById(id);
        }
    
        @PostMapping
        public Mono<User> createUser(@RequestBody User user) {
            return userService.createUser(user);
        }
    
        @DeleteMapping("/{id}")
        public Mono<Void> deleteUser(@PathVariable String id) {
            return userService.deleteUser(id);
        }
    }
    ```
    
    ### 3. **R2DBC와 MongoDB의 차이점**
    
    - **데이터 모델**: R2DBC는 관계형 데이터베이스 (SQL)를 대상으로 하며, MongoDB는 NoSQL, 문서 기반 데이터베이스를 대상으로 합니다.
    - **스키마**: R2DBC는 고정된 스키마를 사용하는 반면, MongoDB는 유연한 스키마를 사용하여 더 쉽게 확장할 수 있습니다.
    - **쿼리 언어**: R2DBC는 SQL 쿼리 언어를 사용하고, MongoDB는 쿼리 도구와 문서 기반 쿼리 언어를 사용합니다.
    - **적용 분야**: R2DBC는 관계형 데이터가 중요한 애플리케이션에 적합하고, MongoDB는 비정형 데이터나 대규모의 데이터를 처리할 때 적합합니다.
    
    ### 4. **학습 포인트**
    
    - **리액티브 프로그래밍 이해**: `Mono`, `Flux`, 비동기 프로세싱, 논블로킹 I/O의 개념을 깊이 이해합니다.
    - **데이터 모델링**: R2DBC와 MongoDB를 각각의 데이터베이스 특성에 맞게 모델링하는 방법을 학습합니다.
    - **연산자 사용**: `map`, `flatMap`, `filter`, `onErrorResume` 등의 리액티브 연산자를 활용하여 데이터를 처리하는 방법을 익힙니다.
    - **에러 처리 및 테스트**: 비동기 환경에서 발생할 수 있는 에러를 적절히 처리하고, 리액티브 방식으로 테스트하는 방법을 학습합니다.
    
    리액티브 데이터베이스와의 연동은 WebFlux 애플리케이션의 핵심 구성 요소 중 하나입니다. 이를 통해 비동기 및 논블로킹 방식의 고성능 애플리케이션을 구축할 수 있습니다.
    

**참고자료**

- Spring WebFlux 공식 문서: [Spring WebFlux Documentation](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html)