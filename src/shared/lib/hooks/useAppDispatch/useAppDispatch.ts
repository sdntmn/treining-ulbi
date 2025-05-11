import { useDispatch } from "react-redux"

import { AppDispatch } from "@/app/providers/StoreProvider"

// для получения возвращаемых типов

export const useAppDispatch = () => useDispatch<AppDispatch>()
