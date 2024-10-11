### HashMap 클래스

<aside>
💡 HashMap 클래스를 보면 `synchronized` 키워드가 존재하지 않습니다. 그렇기 때문에 `Map` 인터페이스를 구현한 클래스 중에서 성능이 제일 좋다고 할 수 있습니다. 하지만 synchronized 키워드가 존재하지 않기 때문에 당연히 `Multi-Thread` 환경에서 사용할 수 없다는 특징을 가지고 있습니다.

</aside>

- synchronized
    - 여러 스레드가 동시에 같은 리소스에 접근하는 것을 방지
    - 한 스레드가 synchronized 메소드나 블록을 실행하고 있을 때, 다른 스레드는 그 객체의 synchronized 메소드나 블록에 진입할 수 없다.

### ConcurrentHashMap 클래스

- Hashtable 클래스의 단점을 보안하면서 Multi-Thread 환경에서 사용할 수 있도록 나온 클래스

https://parkmuhyeun.github.io/woowacourse/2023-09-09-Concurrent-Hashmap/


💡 HashMap 같은 경우 thread-safe 하지 않아 **싱글 스레드 환경**에서 사용해야 한다. 동기화 처리를 하지 않기 때문에 데이터 **탐색하는 속도는 HashTable과 ConcurrentHashMap보다 빠르다.** 하지만, 안정성이 떨어지기 때문에 멀티 스레드 환경에서는 사용하면 좋지 않다.


💡 HashTable과, ConcurrentHashMap은 thread-safe 하기 때문에 **멀티 스레드 환경**에서도 사용할 수 있다. HashTable은 **synchronized 키워드**를 이용해서 스레드간 동기화 락을 걸어 멀티 스레드 환경에서도 안전하지만, 스레드간 동기화 락은 매우 느리다. 하지만, ConcurrentHashMap 같은 경우 **Entry 아이템별로 락**을 걸어 성능이 HashTable 보다 빠르기 때문에 **멀티 스레드 환경에서는 ConcurrentHashMap을 사용하고 싱글 스레드 환경이 보장된다면 HashMap을 쓰자**
