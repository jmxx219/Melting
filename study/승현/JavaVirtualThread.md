## Java Virtual Thread
### Virtual Thread란?
-  기존 Java의 Thread Model은 Native Thread로, Java의 유저 Thread를 만들면 Java Native Interface(JNI)를 통해 커널 영역을 호출하여 OS가 커널 쓰레드를 생성하고 매핑하여 작업 수행
- Java Thread는 I/O, interrupt, sleep과 같은 상황에 block/waiting 상태가 되는데, 이때 다른 스레드가 커널 스레드를 점유하여 작업을 수행하는 것을 컨텍스트 스위치 하고 함
- 점점 서버에 요청량이 증가하게 되어 더 많은 스레드 수를 요구하게 되었고 컨텍스트 스위칭 비용도 기하급수적으로 증가함
- 더 많은 요청 처리량과 컨텍스트 스위칭 비용을 줄이기 위해서 경량 스레드 모델인 Virtual Thread 사용
- JDK21부터 Java Virtual Thread 정식 지원

- 기존 Java의 스레드 모델과 달리, 플랫폼 스레드와 가상 스레드로 나뉨
- 플랫폼 스레드 위에서 여러 Virtual Thread가 번갈아 가며 실행되는 형태이고 Virtual Thread의 컨텍스트 스위칭 비용이 상대적으로 저렴

### Virtual Thread 구조
- carrierThread : 실제로 작업을 수행시키는 platform thread, workQueue를 가지고 있음
- scheduler : ForkJoinPool, carrierThread의 pool 역할을 하고 가상 스레드의 작업 스케줄링 담당
- runConrinuation : Vitrual Thread의 실제 작업 내용(Runnable)

### Virtual Thread의 동작 원리
1. 실행될 virtual thread의 작업인 runContinuation을 carrier thread의 workQueue에 push
2. workQueue에 있는 runContinuation들은 forkJoinPool에 의해 work stealing 방식으로 carrier thread에 의해 처리
3. 처리되던 runContinuarion들은 I/O, sleep으로 인한 interrupt나 작업 완료 시 workQueue에서 pop 되어 park 과정에 의해 다시 힙 메모리로 복귀

SpringBoot에서 Virtual Thread를 사용하기 위해서는 Executor를 설정하여 Virtual Thread를 사용하도록 해야 함. 이를 위해 @Bean으로 등록하자
```
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executors;
import java.util.concurrent.Executor;

@SpringBootApplication
public class VirtualThreadApplication {

    public static void main(String[] args) {
        SpringApplication.run(VirtualThreadApplication.class, args);
    }

    @Bean
    public Executor taskExecutor() {
        return Executors.newVirtualThreadPerTaskExecutor();
    }
}

```