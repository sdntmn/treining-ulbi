import { useDispatch } from "react-redux"

// eslint-disable-next-line paths-import/imports-layers
import { AppDispatch } from "@/app/providers/StoreProvider"

// для получения возвращаемых типов

export const useAppDispatch = () => useDispatch<AppDispatch>()
