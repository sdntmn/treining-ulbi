import { AppDispatch } from "app/providers/StoreProvider"
import { useDispatch } from "react-redux"

// для получения возвращаемых типов

export const useAppDispatch = () => useDispatch<AppDispatch>()
