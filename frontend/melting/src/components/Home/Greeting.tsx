// import { useUserContext } from '@/contexts/UserContext';

const Greeting = () => {
  //   const { nickname } = useUserContext();
  const nickname = '쏠랑쏠랑'
  return (
    <div className="flex text-2xl font-bold">
      <div className="text-primary-400">{nickname}</div>님, 안녕하세요
    </div>
  )
}

export default Greeting
