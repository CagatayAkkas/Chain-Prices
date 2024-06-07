import Loading from "../Loading/Loading"
import { StyledFallback } from "./Fallback.style"

const Fallback = () => {
   return (
      <StyledFallback>
         <Loading size={80} />
      </StyledFallback>
   )
}

export default Fallback